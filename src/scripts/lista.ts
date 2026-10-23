// Lista de consulta: el cliente junta productos (con el color elegido)
// y manda un solo mensaje de WhatsApp con todo.

/** `color` es la elección completa, por ejemplo "terciopelo azul royal" */
export type ItemLista = { slug: string; nombre: string; color?: string };

const CLAVE = 'astetik-lista';
const EVENTO = 'lista:cambio';

export function leerLista(): ItemLista[] {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardar(items: ItemLista[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  } catch {
    // Sin almacenamiento (modo privado): la lista vive solo en esta página
  }
  memoria = items;
  document.dispatchEvent(new CustomEvent(EVENTO));
}

let memoria: ItemLista[] | null = null;
const actual = () => memoria ?? leerLista();

export function agregarALista(item: ItemLista) {
  const items = actual();
  const repetido = items.some((i) => i.slug === item.slug && i.color === item.color);
  if (!repetido) guardar([...items, item]);
}

export function quitarDeLista(indice: number) {
  guardar(actual().filter((_, i) => i !== indice));
}

export function vaciarLista() {
  guardar([]);
}

export function alCambiarLista(fn: (items: ItemLista[]) => void) {
  document.addEventListener(EVENTO, () => fn(actual()));
  fn(actual());
}

export function mensajeLista(items: ItemLista[]) {
  const lineas = items.map((i) => `• ${i.nombre}${i.color ? ` en ${i.color}` : ''}`);
  return `¡Hola! Vi su página web y quiero consultar por:\n${lineas.join('\n')}\n\n¿Me pasan precio y demora? Gracias.`;
}
