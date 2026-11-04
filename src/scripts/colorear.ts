// Pinta la tela de una foto del color elegido, conservando luces, sombras y textura.
// Usa la foto y su máscara (blanco = tela): por cada píxel de tela toma su luminosidad y le aplica
// el color nuevo (en luz lineal, como se comporta una tela real bajo la misma iluminación).

const lineal = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
const fInv = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);

/** Luminosidad L* (0-100) de un color sRGB 0-255 */
function luz(r: number, g: number, b: number) {
  const y = 0.2126 * lineal(r / 255) + 0.7152 * lineal(g / 255) + 0.0722 * lineal(b / 255);
  return 116 * f(y) - 16;
}

function cargar(src: string) {
  return new Promise<HTMLImageElement>((ok, error) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => ok(img);
    img.onerror = error;
    img.src = src;
  });
}

export type Colorear = (hex: string) => void;

const PESOS = [0.2126, 0.7152, 0.0722];
const luminancia = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].reduce((s, c, i) => s + PESOS[i] * lineal(c / 255), 0);
};

/**
 * Prepara el canvas con la foto y devuelve la función que la pinta de un color.
 * `hexBase` es el color real de la tela en la foto: sirve para respetar la luz de la escena
 * (en una foto con poca luz, un blanco se ve un poco más gris, como en la realidad).
 */
export async function prepararColoreo(canvas: HTMLCanvasElement, srcFoto: string, srcMascara: string, hexBase: string): Promise<Colorear> {
  const [foto, mascara] = await Promise.all([cargar(srcFoto), cargar(srcMascara)]);
  const ancho = foto.naturalWidth;
  const alto = foto.naturalHeight;
  canvas.width = ancho;
  canvas.height = alto;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

  ctx.drawImage(mascara, 0, 0, ancho, alto);
  const datosMascara = ctx.getImageData(0, 0, ancho, alto).data;
  ctx.drawImage(foto, 0, 0, ancho, alto);
  const original = ctx.getImageData(0, 0, ancho, alto);
  const px = original.data;
  const total = ancho * alto;

  // Luminosidad de cada píxel de tela (L* de 0 a 255) y la luminosidad típica de la tela
  const luces = new Uint8Array(total);
  const alfa = new Uint8Array(total);
  const histograma = new Uint32Array(256);
  for (let i = 0; i < total; i++) {
    const m = datosMascara[i * 4];
    if (m === 0) continue;
    alfa[i] = m;
    const l = Math.round(luz(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) * 2.55);
    luces[i] = l;
    if (m > 200) histograma[l]++;
  }
  let acumulado = 0;
  let mediana = 128;
  const mitad = histograma.reduce((s, n) => s + n, 0) / 2;
  for (let l = 0; l < 256; l++) {
    acumulado += histograma[l];
    if (acumulado >= mitad) { mediana = l; break; }
  }
  let p95 = 255;
  acumulado = 0;
  for (let l = 0; l < 256; l++) {
    acumulado += histograma[l];
    if (acumulado >= mitad * 1.9) { p95 = l; break; }
  }
  const yDe = (l: number) => fInv((l / 2.55 + 16) / 116);
  // Los brillos fuertes se suavizan (si no, en colores intensos quedan manchas blancas)
  const brillo = (k: number) => (k > 1 ? 1 + (k - 1) / k : k);
  const yRef = Math.max(yDe(mediana), 0.002);
  // Cuánta luz tiene la escena comparada con el color real (ajuste suave: en los colores intensos
  // la foto siempre parece más oscura que la muestra, y eso no es falta de luz)
  const exposicion = Math.min(1.1, Math.max(0.8, Math.sqrt(yRef / Math.max(luminancia(hexBase), 0.002))));

  const salida = ctx.createImageData(ancho, alto);
  const sal = salida.data;

  return (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    let destino = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => lineal(c / 255) * exposicion);
    // En colores claros, que las zonas más iluminadas no se quemen a blanco y se pierda la textura
    const tope = Math.max(...destino) * brillo(yDe(p95) / yRef);
    if (tope > 0.92) destino = destino.map((c) => (c * 0.92) / tope);
    // Tabla: luminosidad original -> color nuevo. La tela nueva refleja la luz igual que la
    // original: cada píxel es el color elegido multiplicado por cuánta luz recibe ese punto.
    const tabla = new Uint8Array(256 * 3);
    for (let l = 0; l < 256; l++) {
      const k = brillo(yDe(l) / yRef);
      let rgb = destino.map((c) => c * k);
      const max = Math.max(...rgb);
      // Los brillos que se pasan de blanco se aclaran de a poco en vez de quemarse
      if (max > 1) rgb = rgb.map((c) => c / max + (1 - c / max) * Math.min(1, (max - 1) / max));
      for (let c = 0; c < 3; c++) tabla[l * 3 + c] = Math.round(255 * Math.min(1, Math.max(0, gamma(rgb[c]))));
    }
    for (let i = 0, j = 0; i < total; i++, j += 4) {
      const a = alfa[i];
      if (a === 0) {
        sal[j] = px[j]; sal[j + 1] = px[j + 1]; sal[j + 2] = px[j + 2];
      } else {
        const k = luces[i] * 3;
        const t = a / 255;
        sal[j] = px[j] + (tabla[k] - px[j]) * t;
        sal[j + 1] = px[j + 1] + (tabla[k + 1] - px[j + 1]) * t;
        sal[j + 2] = px[j + 2] + (tabla[k + 2] - px[j + 2]) * t;
      }
      sal[j + 3] = 255;
    }
    ctx.putImageData(salida, 0, 0);
  };
}
