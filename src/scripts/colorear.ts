// Pinta la tela de una foto del color elegido, conservando luces, sombras y textura.
// Usa la foto y su máscara (blanco = tela): por cada píxel de tela toma su luminosidad y le aplica
// el tono del color nuevo (en espacio Lab, que separa luz de color).

type Lab = [number, number, number];

const lineal = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
const fInv = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);

/** Luminosidad L* (0-100) de un color sRGB 0-255 */
function luz(r: number, g: number, b: number) {
  const y = 0.2126 * lineal(r / 255) + 0.7152 * lineal(g / 255) + 0.0722 * lineal(b / 255);
  return 116 * f(y) - 16;
}

function hexALab(hex: string): Lab {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => lineal(c / 255));
  const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047;
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function labARgb([l, a, b]: Lab): [number, number, number] {
  const fy = (l + 16) / 116;
  const x = 0.95047 * fInv(fy + a / 500);
  const y = fInv(fy);
  const z = 1.08883 * fInv(fy - b / 200);
  const rgb = [3.2406 * x - 1.5372 * y - 0.4986 * z, -0.9689 * x + 1.8758 * y + 0.0415 * z, 0.0557 * x - 0.204 * y + 1.057 * z];
  return rgb.map((c) => Math.round(255 * Math.min(1, Math.max(0, gamma(c))))) as [number, number, number];
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

/** Prepara el canvas con la foto y devuelve la función que la pinta de un color */
export async function prepararColoreo(canvas: HTMLCanvasElement, srcFoto: string, srcMascara: string): Promise<Colorear> {
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

  // Luminosidad de cada píxel de tela (0-255) y la luminosidad típica de la tela
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
  const lRef = Math.max(mediana / 2.55, 5);

  const salida = ctx.createImageData(ancho, alto);
  const sal = salida.data;

  return (hex: string) => {
    const [lt, at, bt] = hexALab(hex);
    // Tabla: luminosidad original -> color nuevo. Debajo de la luz típica, las sombras escalan
    // hacia el negro; encima, los brillos suben hacia el blanco (más suave en colores claros).
    const tabla = new Uint8Array(256 * 3);
    for (let l = 0; l < 256; l++) {
      const lo = l / 2.55;
      let ln: number;
      if (lo <= lRef) ln = lt * (lo / lRef) ** 0.85;
      else ln = lt + (100 - lt) * ((lo - lRef) / (100 - lRef)) * 0.75;
      // En las sombras el color también pierde intensidad
      const croma = Math.min(1, Math.max(0.35, ln / Math.max(lt, 1)));
      const [r, g, b] = labARgb([ln, at * croma, bt * croma]);
      tabla[l * 3] = r;
      tabla[l * 3 + 1] = g;
      tabla[l * 3 + 2] = b;
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
