// Catálogo. Cada modelo aparece una sola vez; las medidas o versiones van en `opciones`
// y los colores con foto propia en `fotos`.
// Para sumar un producto:
// 1. Creá una carpeta en src/assets/productos/ con el slug del producto y copiá ahí las fotos.
// 2. Agregá un objeto a PRODUCTOS (la primera foto es la portada).
// La página del producto, el catálogo, los filtros y el sitemap se generan solos.
// Precios y links tomados de Mercado Libre el 23/10/2026.

import type { ImageMetadata } from 'astro';
import { DESCUENTO_DIRECTO } from './sitio';

const archivos = import.meta.glob<{ default: ImageMetadata }>('../assets/productos/**/*.{jpg,jpeg,png,webp}', { eager: true });

function foto(ruta: string): ImageMetadata {
  const archivo = archivos[`../assets/productos/${ruta}`];
  if (!archivo) throw new Error(`No existe la foto src/assets/productos/${ruta}`);
  return archivo.default;
}

export const CATEGORIAS = [
  { id: 'respaldos', nombre: 'Respaldos y bauleras' },
  { id: 'puffs', nombre: 'Puffs' },
  { id: 'sillones', nombre: 'Sillones' },
  { id: 'mostradores', nombre: 'Mostradores' },
  { id: 'camillas', nombre: 'Camillas' },
  { id: 'sillas', nombre: 'Sillas y banquetas' },
] as const;

export const USOS = [
  { id: 'hogar', nombre: 'Hogar' },
  { id: 'estetica', nombre: 'Estética y spa' },
  { id: 'comercial', nombre: 'Locales comerciales' },
] as const;

export type CategoriaId = (typeof CATEGORIAS)[number]['id'];
export type UsoId = (typeof USOS)[number]['id'];

/** Si la foto muestra un color del muestrario, al elegir ese color en la ficha se muestra esta foto */
export type Foto = { imagen: ImageMetadata; tela?: string; color?: string };

/** Una medida o versión del modelo, con su precio y su publicación de Mercado Libre */
export type Opcion = { nombre: string; precio: number; mercadolibre: string };

export type Producto = {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  usos: UsoId[];
  /** Telas en las que se fabrica (ids de src/data/colores.ts). Si no se indica, todas. */
  telas?: string[];
  resumen: string;
  descripcion: string;
  detalles: string[];
  /** Cómo se llama la elección entre opciones: Medida, Versión, Diámetro... */
  etiquetaOpcion?: string;
  opciones: Opcion[];
  fotos: Foto[];
  destacado?: boolean;
};

export const PRODUCTOS: Producto[] = [
  {
    slug: 'respaldo-flor',
    nombre: 'Respaldo Flor',
    categoria: 'respaldos',
    usos: ['hogar'],
    telas: ['pana'],
    resumen: 'Respaldo de cama con gajos en forma de pétalo, de 1 plaza a king.',
    descripcion:
      'Nuestro modelo más pedido. Gajos en forma de pétalo tapizados en pana, para un dormitorio con personalidad. Se hace en todas las medidas de cama y en el color que elijas.',
    detalles: [
      '130 cm de alto en todas las medidas',
      'Tapizado en pana antimanchas',
      'Relleno de espuma de alta densidad',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Medida',
    opciones: [
      { nombre: '100 cm · 1 plaza', precio: 139058, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-mueblesastetik-flor-100x130-cm-pana/up/MLAU3880939023' },
      { nombre: '120 cm', precio: 180000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-flor-120-cm-pana-mueblesastetik/up/MLAU3865693937' },
      { nombre: '140 cm · 2 plazas', precio: 197877, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-flor-140cm/up/MLAU3813211891' },
      { nombre: '160 cm · Queen', precio: 250000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-mueblesastetik-flor-160cm/up/MLAU3898298977' },
      { nombre: '180 cm', precio: 280000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-mueblesastetik-flor-180cm/up/MLAU3967751289' },
      { nombre: '200 cm · King', precio: 312000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-mueblesastetik-flor-200cm-king/up/MLAU3909804968' },
    ],
    fotos: [
      { imagen: foto('respaldo-flor/01.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('respaldo-flor/02.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('respaldo-flor/03.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('respaldo-flor/04.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('respaldo-flor/05.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('respaldo-flor/06.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('respaldo-flor/07.webp'), tela: 'pana', color: 'verde-esmeralda' },
      { imagen: foto('respaldo-flor/08.webp'), tela: 'pana', color: 'violeta' },
      { imagen: foto('respaldo-flor/09.webp'), tela: 'pana', color: 'amarillo' },
      { imagen: foto('respaldo-flor/10.webp'), tela: 'pana', color: 'lila' },
      { imagen: foto('respaldo-flor/11.webp'), tela: 'pana', color: 'naranja' },
      { imagen: foto('respaldo-flor/12.webp'), tela: 'pana', color: 'natural' },
      { imagen: foto('respaldo-flor/13.webp'), tela: 'pana', color: 'vizon' },
      { imagen: foto('respaldo-flor/14.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'respaldo-capitone',
    nombre: 'Respaldo Capitoné',
    categoria: 'respaldos',
    usos: ['hogar'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'El clásico respaldo capitoné con borde de tachas, de 90 cm a king.',
    descripcion:
      'Un clásico que nunca falla. Capitoné con botones forrados, borde de tachas y relleno de alta densidad. Se fabrica en pana o eco-cuero, en todas las medidas de cama.',
    detalles: [
      '130 cm de alto',
      'Capitoné con botones forrados y borde de tachas',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Medida',
    opciones: [
      { nombre: '90 cm · 1 plaza', precio: 127000, mercadolibre: 'https://articulo.mercadolibre.com.ar/MLA-1987719848-mueblesastetik-capitone-respaldo-de-cama-90x130-pana-_JM' },
      { nombre: '100 cm', precio: 135000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldos-de-cama/up/MLAU3884724014' },
      { nombre: '120 cm', precio: 151000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-capitone-120-cm-pana--mueblesastetik/up/MLAU3273135459' },
      { nombre: '140 cm · 2 plazas', precio: 172689, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-mueblesastetik-140cm-pana-clasico/up/MLAU3763847247' },
      { nombre: '160 cm · Queen', precio: 201333, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-160-cm/up/MLAU3873185145' },
      { nombre: '180 cm', precio: 243000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-180-cm/up/MLAU3887860570' },
      { nombre: '200 cm · King', precio: 245549, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-king/up/MLAU3810450114' },
    ],
    fotos: [
      { imagen: foto('respaldo-capitone/01.webp'), tela: 'pana', color: 'rosa-claro' },
      { imagen: foto('respaldo-capitone/02.webp'), tela: 'pana', color: 'azul-oscuro' },
      { imagen: foto('respaldo-capitone/03.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('respaldo-capitone/04.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('respaldo-capitone/05.webp'), tela: 'pana', color: 'verde-ingles' },
      { imagen: foto('respaldo-capitone/06.webp'), tela: 'pana', color: 'violeta-oscuro' },
      { imagen: foto('respaldo-capitone/07.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('respaldo-capitone/08.webp'), tela: 'eco-cuero', color: 'beige' },
      { imagen: foto('respaldo-capitone/09.webp'), tela: 'pana', color: 'gris' },
      { imagen: foto('respaldo-capitone/10.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('respaldo-capitone/11.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('respaldo-capitone/12.webp'), tela: 'pana', color: 'violeta' },
      { imagen: foto('respaldo-capitone/13.webp') },
      { imagen: foto('respaldo-capitone/14.webp') },
    ],
  },
  {
    slug: 'respaldo-vainillado',
    nombre: 'Respaldo Vainillado',
    categoria: 'respaldos',
    usos: ['hogar'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Respaldo de líneas verticales, moderno y sobrio.',
    descripcion:
      'Respaldo con paneles verticales (vainillado) de estilo moderno. Queda bien en dormitorios de líneas simples y se hace en pana o eco-cuero.',
    detalles: [
      '130 cm de alto',
      'Paneles verticales acolchados',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Medida',
    opciones: [
      { nombre: '140 cm · 2 plazas', precio: 164000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-vainillado-140-cm-en-tela-pana-o-ecocuero/up/MLAU3250784289' },
      { nombre: '160 cm · Queen', precio: 187000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-vainillado-160-cm-en-tela-pana-o-ecocuero/up/MLAU5035011488' },
    ],
    fotos: [
      { imagen: foto('respaldo-vainillado/01.webp'), tela: 'pana', color: 'gris' },
      { imagen: foto('respaldo-vainillado/02.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('respaldo-vainillado/03.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('respaldo-vainillado/04.webp') },
      { imagen: foto('respaldo-vainillado/05.webp') },
      { imagen: foto('respaldo-vainillado/06.webp') },
    ],
  },
  {
    slug: 'baulera-capitone',
    nombre: 'Baulera Pie de Cama',
    categoria: 'respaldos',
    usos: ['hogar'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Baulera capitoné para el pie de la cama, sola o con respaldo al tono.',
    descripcion:
      'Baulera capitoné con espacio de guardado, ideal para el pie de la cama. Se puede pedir sola o en combo con un respaldo capitoné haciendo juego.',
    detalles: [
      'Baulera de 1 m de largo, 45 cm de alto y 40 cm de profundidad',
      'Tapa capitoné con espacio de guardado',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Versión',
    opciones: [
      { nombre: 'Baulera sola', precio: 254000, mercadolibre: 'https://www.mercadolibre.com.ar/bauleras-pie-de-cama-con-capitone/up/MLAU4642246227' },
      { nombre: 'Combo respaldo 140 cm + baulera', precio: 350000, mercadolibre: 'https://www.mercadolibre.com.ar/respaldo-de-cama-y-baulera/up/MLAU3779841486' },
    ],
    fotos: [
      { imagen: foto('baulera-capitone/01.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('baulera-capitone/02.webp'), tela: 'pana', color: 'amarillo' },
      { imagen: foto('baulera-capitone/03.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('baulera-capitone/04.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('baulera-capitone/05.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('baulera-capitone/06.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('baulera-capitone/07.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('baulera-capitone/08.webp'), tela: 'pana', color: 'verde-esmeralda' },
      { imagen: foto('baulera-capitone/09.webp') },
      { imagen: foto('baulera-capitone/10.webp') },
      { imagen: foto('baulera-capitone/11.webp') },
    ],
  },
  {
    slug: 'puff-redondo',
    nombre: 'Puff Redondo',
    categoria: 'puffs',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Puff de 45 cm con patas metálicas, liso o capitoné.',
    descripcion:
      'El puff que va con todo: tocador, dormitorio, living o el puesto de trabajo de un salón. Tapa capitoné con tachas, capitoné completo o liso, sobre patas metálicas.',
    detalles: [
      '45 cm de alto y 40 a 42 cm de diámetro',
      'Patas metálicas',
      'Pana antimanchas o eco-cuero',
      'Soporta hasta 150 kg',
    ],
    etiquetaOpcion: 'Terminación',
    opciones: [
      { nombre: 'Tapa capitoné con tachas', precio: 93100, mercadolibre: 'https://articulo.mercadolibre.com.ar/MLA-1511484796-puff-redondo-mueblesastetik-pana-42x45-cm-con-patas-_JM' },
      { nombre: 'Capitoné completo', precio: 98000, mercadolibre: 'https://www.mercadolibre.com.ar/pufs-redondo-capitone/up/MLAU2915325540' },
      { nombre: 'Liso', precio: 98000, mercadolibre: 'https://www.mercadolibre.com.ar/mueblesastetik-puff-liso-45-cm/up/MLAU4164942791' },
    ],
    fotos: [
      { imagen: foto('puff-redondo/01.webp'), tela: 'pana', color: 'rosa-viejo' },
      { imagen: foto('puff-redondo/02.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('puff-redondo/03.webp'), tela: 'pana', color: 'bordo' },
      { imagen: foto('puff-redondo/04.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('puff-redondo/05.webp'), tela: 'eco-cuero', color: 'fucsia' },
      { imagen: foto('puff-redondo/06.webp'), tela: 'pana', color: 'naranja' },
      { imagen: foto('puff-redondo/07.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('puff-redondo/08.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('puff-redondo/09.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('puff-redondo/10.webp'), tela: 'pana', color: 'turquesa' },
      { imagen: foto('puff-redondo/11.webp'), tela: 'eco-cuero', color: 'verde-ingles' },
      { imagen: foto('puff-redondo/12.webp'), tela: 'eco-cuero', color: 'violeta' },
      { imagen: foto('puff-redondo/13.webp') },
      { imagen: foto('puff-redondo/14.webp') },
    ],
  },
  {
    slug: 'puff-cuadrado',
    nombre: 'Puff Cuadrado',
    categoria: 'puffs',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Puff cubo capitoné con tachas y patas metálicas.',
    descripcion:
      'Puff cuadrado con tapa capitoné y borde de tachas. Se pueden juntar varios en distintos colores para armar una banqueta larga en salas de espera o vestidores.',
    detalles: [
      '45 cm de alto',
      'Tapa capitoné y borde de tachas',
      'Patas metálicas',
      'Pana antimanchas o eco-cuero',
    ],
    opciones: [
      { nombre: 'Puff cuadrado', precio: 93100, mercadolibre: 'https://articulo.mercadolibre.com.ar/MLA-1198276992-puff-cuadrados-_JM' },
    ],
    fotos: [
      { imagen: foto('puff-cuadrado/01.webp') },
      { imagen: foto('puff-cuadrado/02.webp'), tela: 'pana', color: 'amarillo' },
      { imagen: foto('puff-cuadrado/03.webp'), tela: 'pana', color: 'blanco' },
      { imagen: foto('puff-cuadrado/04.webp'), tela: 'pana', color: 'celeste' },
      { imagen: foto('puff-cuadrado/05.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('puff-cuadrado/06.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('puff-cuadrado/07.webp'), tela: 'pana', color: 'rosa-claro' },
      { imagen: foto('puff-cuadrado/08.webp'), tela: 'pana', color: 'verde-ingles' },
    ],
  },
  {
    slug: 'puff-con-respaldo',
    nombre: 'Puff con Respaldo',
    categoria: 'puffs',
    usos: ['hogar', 'estetica'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Puff redondo con respaldo capitoné, entre puff y sillón.',
    descripcion:
      'Asiento redondo con respaldo capitoné y tachas, sobre patas metálicas. Un sillón chico y cómodo para el dormitorio, el vestidor o la sala de espera.',
    detalles: [
      '85 cm de alto y 54 cm de diámetro',
      'Respaldo capitoné',
      'Asiento liso o capitoné con tachas',
      'Pana antimanchas o eco-cuero',
    ],
    etiquetaOpcion: 'Asiento',
    opciones: [
      { nombre: 'Asiento capitoné con tachas', precio: 179550, mercadolibre: 'https://www.mercadolibre.com.ar/puff-redondo-con-respaldo-mueblesastetik-panacuerina/up/MLAU4137614985' },
      { nombre: 'Asiento liso', precio: 187000, mercadolibre: 'https://www.mercadolibre.com.ar/puff-redondo-con-respaldo-mueblesastetikasiento-liso/up/MLAU4572576496' },
    ],
    fotos: [
      { imagen: foto('puff-con-respaldo/01.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('puff-con-respaldo/02.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('puff-con-respaldo/03.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('puff-con-respaldo/04.webp'), tela: 'eco-cuero', color: 'negro' },
      { imagen: foto('puff-con-respaldo/05.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('puff-con-respaldo/06.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('puff-con-respaldo/07.webp'), tela: 'pana', color: 'verde-esmeralda' },
      { imagen: foto('puff-con-respaldo/08.webp'), tela: 'pana', color: 'gris' },
      { imagen: foto('puff-con-respaldo/09.webp') },
    ],
  },
  {
    slug: 'puff-capitone-grande',
    nombre: 'Puff Capitoné Grande',
    categoria: 'puffs',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Puff redondo capitoné con tachas, de 60 cm a 1,5 m.',
    descripcion:
      'Puff circular con capitoné en toda la tapa y borde de tachas. Funciona como asiento central en salas de espera, probadores y livings. Elegí el tamaño según tu espacio.',
    detalles: [
      '45 cm de alto',
      'Tapa capitoné con borde de tachas',
      'Patas metálicas',
      'Pana antimanchas o eco-cuero',
    ],
    etiquetaOpcion: 'Diámetro',
    opciones: [
      { nombre: '60 cm', precio: 155800, mercadolibre: 'https://www.mercadolibre.com.ar/puffs-modelo-l/up/MLAU236458896' },
      { nombre: '80 cm', precio: 207000, mercadolibre: 'https://www.mercadolibre.com.ar/pufs-con-capitone/up/MLAU1169860941' },
      { nombre: '1 m', precio: 230000, mercadolibre: 'https://www.mercadolibre.com.ar/puffs-con-capitone-xl/up/MLAU3383945562' },
      { nombre: '1 m · todo capitoné', precio: 295000, mercadolibre: 'https://www.mercadolibre.com.ar/puffs-todo-capitone-xl/up/MLAU3822663264' },
      { nombre: '1,5 m', precio: 321000, mercadolibre: 'https://www.mercadolibre.com.ar/puff-redond-capitone-xxl/up/MLAU2912797401' },
    ],
    fotos: [
      { imagen: foto('puff-capitone-grande/01.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('puff-capitone-grande/02.webp'), tela: 'pana', color: 'bordo' },
      { imagen: foto('puff-capitone-grande/03.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('puff-capitone-grande/04.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('puff-capitone-grande/05.webp'), tela: 'pana', color: 'beige' },
      { imagen: foto('puff-capitone-grande/06.webp'), tela: 'pana', color: 'gris-oscuro' },
      { imagen: foto('puff-capitone-grande/07.webp'), tela: 'pana', color: 'naranja' },
      { imagen: foto('puff-capitone-grande/08.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('puff-capitone-grande/09.webp') },
      { imagen: foto('puff-capitone-grande/10.webp') },
      { imagen: foto('puff-capitone-grande/11.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'sillon-redondo-capitone',
    nombre: 'Sillón Redondo Capitoné',
    categoria: 'sillones',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Sillón circular con respaldo envolvente y almohadones, de 1 m o 1,5 m.',
    descripcion:
      'Un sillón que se convierte en el centro de cualquier ambiente. Asiento redondo capitoné con respaldo envolvente y almohadones sueltos, para livings amplios, salas de espera o vidrieras.',
    detalles: [
      '85 cm de alto con respaldo',
      'Asiento capitoné',
      'Almohadones sueltos incluidos',
      'Pana antimanchas o eco-cuero',
    ],
    etiquetaOpcion: 'Diámetro',
    opciones: [
      { nombre: '1 m', precio: 350000, mercadolibre: 'https://www.mercadolibre.com.ar/puffs-con-respaldo-capitone-xl/up/MLAU3672344061' },
      { nombre: '1,5 m · XXL', precio: 525000, mercadolibre: 'https://www.mercadolibre.com.ar/puffs-xxl-mueblesastetik-capitone-redondo/up/MLAU3908914108' },
    ],
    fotos: [
      { imagen: foto('sillon-redondo-capitone/01.webp'), tela: 'pana', color: 'natural' },
      { imagen: foto('sillon-redondo-capitone/02.webp') },
      { imagen: foto('sillon-redondo-capitone/03.webp') },
      { imagen: foto('sillon-redondo-capitone/04.webp') },
      { imagen: foto('sillon-redondo-capitone/05.webp') },
      { imagen: foto('sillon-redondo-capitone/06.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'sillon-labios',
    nombre: 'Sillón Labios',
    categoria: 'sillones',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana'],
    resumen: 'El clásico sillón con forma de labios, de 2 cuerpos.',
    descripcion:
      'Un diseño icónico que no pasa desapercibido. Perfecto para salones de belleza, locales de ropa, cuartos juveniles o como pieza de diseño en el living.',
    detalles: [
      '140 cm de ancho, 70 cm de profundidad y 90 cm de alto',
      'Tapizado en pana',
      'Patas metálicas',
      'Se fabrica en cualquier color del muestrario',
    ],
    opciones: [
      { nombre: '2 cuerpos', precio: 585000, mercadolibre: 'https://www.mercadolibre.com.ar/sillon-mueblesastetik-beso-2-cuerpos-de-pana/up/MLAU4669363660' },
    ],
    fotos: [
      { imagen: foto('sillon-labios/01.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('sillon-labios/02.webp') },
      { imagen: foto('sillon-labios/03.webp') },
      { imagen: foto('sillon-labios/04.webp') },
      { imagen: foto('sillon-labios/05.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'sillon-zapato',
    nombre: 'Sillón Zapato',
    categoria: 'sillones',
    usos: ['hogar', 'estetica', 'comercial'],
    telas: ['pana'],
    resumen: 'Sillón con forma de zapato de taco alto.',
    descripcion:
      'Un sillón divertido con forma de stiletto, ideal para zapaterías, locales de ropa, vestidores y salones que buscan una pieza llamativa para las fotos.',
    detalles: [
      '50 cm de ancho, 50 cm de profundidad y 100 cm de alto',
      'Tapizado en pana',
      'Se fabrica en cualquier color del muestrario',
    ],
    opciones: [
      { nombre: 'Sillón zapato', precio: 320000, mercadolibre: 'https://www.mercadolibre.com.ar/sillon-mueblesastetik-zapatos-tapizado-en-pana/up/MLAU4273446752' },
    ],
    fotos: [
      { imagen: foto('sillon-zapato/01.webp'), tela: 'pana', color: 'negro' },
      { imagen: foto('sillon-zapato/02.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('sillon-zapato/03.webp') },
      { imagen: foto('sillon-zapato/04.webp') },
    ],
  },
  {
    slug: 'mostrador-capitone',
    nombre: 'Mostrador Capitoné',
    categoria: 'mostradores',
    usos: ['estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Mostrador de recepción con frente capitoné, simple o con cajonera.',
    descripcion:
      'La primera impresión de tu local. Mostrador de recepción con frente capitoné, pensado para centros de estética, peluquerías, consultorios y showrooms.',
    detalles: [
      '1 m de ancho, 1,10 m de alto y 40 cm de profundidad',
      'Frente capitoné',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Versión',
    opciones: [
      { nombre: 'Mostrador 1 m', precio: 252485, mercadolibre: 'https://www.mercadolibre.com.ar/mostrador-con-capitone/up/MLAU463656914' },
      { nombre: 'Mostrador 1 m con cajonera', precio: 315600, mercadolibre: 'https://www.mercadolibre.com.ar/mostrador-con-capitone-cajonera/up/MLAU4683106576' },
    ],
    fotos: [
      { imagen: foto('mostrador-capitone/01.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('mostrador-capitone/02.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('mostrador-capitone/03.webp'), tela: 'eco-cuero', color: 'blanco' },
      { imagen: foto('mostrador-capitone/04.webp'), tela: 'eco-cuero', color: 'rosa-gold' },
      { imagen: foto('mostrador-capitone/05.webp') },
      { imagen: foto('mostrador-capitone/06.webp') },
      { imagen: foto('mostrador-capitone/07.webp') },
      { imagen: foto('mostrador-capitone/08.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'mostrador-curvo-capitone',
    nombre: 'Mostrador Curvo Capitoné',
    categoria: 'mostradores',
    usos: ['estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Mostrador de líneas curvas, de 1,65 m o 2,30 m.',
    descripcion:
      'Mostrador capitoné curvo, tipo medialuna, para recepciones con presencia. Acompaña la estética de boutiques, showrooms, centros de estética y oficinas.',
    detalles: [
      '1,10 m de alto y 40 cm de profundidad',
      'Frente capitoné curvo',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    etiquetaOpcion: 'Ancho',
    opciones: [
      { nombre: '1,65 m · medialuna', precio: 581000, mercadolibre: 'https://www.mercadolibre.com.ar/mueblesastetik-medialuna-mostrador-curvo-capitone/up/MLAU4577300894' },
      { nombre: '2,30 m', precio: 580000, mercadolibre: 'https://www.mercadolibre.com.ar/mostrador-curbo-con-capitone/up/MLAU224736722' },
    ],
    fotos: [
      { imagen: foto('mostrador-curvo-capitone/01.webp'), tela: 'pana', color: 'rojo' },
      { imagen: foto('mostrador-curvo-capitone/02.webp') },
      { imagen: foto('mostrador-curvo-capitone/03.webp') },
      { imagen: foto('mostrador-curvo-capitone/04.webp') },
      { imagen: foto('mostrador-curvo-capitone/05.webp') },
      { imagen: foto('mostrador-curvo-capitone/06.webp') },
      { imagen: foto('mostrador-curvo-capitone/07.webp') },
      { imagen: foto('mostrador-curvo-capitone/08.webp') },
    ],
  },
  {
    slug: 'mostrador-capitone-con-puffs',
    nombre: 'Combo Recepción Capitoné',
    categoria: 'mostradores',
    usos: ['estetica', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Mostrador capitoné con 2 puffs y 1 banqueta al tono.',
    descripcion:
      'Una recepción completa con identidad propia: mostrador capitoné, dos puffs y una banqueta alta haciendo juego. Pensado para salones de belleza, uñas y pestañas.',
    detalles: [
      'Mostrador capitoné de 1 m',
      '2 puffs redondos y 1 banqueta alta',
      'Todo en la misma tela y color',
      'Se fabrica en cualquier color del muestrario',
    ],
    opciones: [
      { nombre: 'Mostrador + 2 puffs + 1 banqueta', precio: 465000, mercadolibre: 'https://www.mercadolibre.com.ar/mostrador-mueblesastetik-con-2-puffs-y-1-banqueta/up/MLAU262353453' },
    ],
    fotos: [
      { imagen: foto('mostrador-capitone-con-puffs/01.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('mostrador-capitone-con-puffs/02.webp'), tela: 'pana', color: 'azul-francia' },
      { imagen: foto('mostrador-capitone-con-puffs/03.webp') },
      { imagen: foto('mostrador-capitone-con-puffs/04.webp') },
      { imagen: foto('mostrador-capitone-con-puffs/05.webp') },
      { imagen: foto('mostrador-capitone-con-puffs/06.webp') },
      { imagen: foto('mostrador-capitone-con-puffs/07.webp') },
    ],
  },
  {
    slug: 'camilla-lashista',
    nombre: 'Camilla Lashista',
    categoria: 'camillas',
    usos: ['estetica'],
    telas: ['eco-cuero', 'pana'],
    resumen: 'Camilla ergonómica capitoné para pestañas y cejas.',
    descripcion:
      'Camilla de diseño ergonómico tapizada en capitoné. Cómoda para tus clientas y fácil de limpiar, ideal para lifting de pestañas, cejas, masajes y spa.',
    detalles: [
      '1,70 m de largo, 70 cm de ancho y 70 cm de alto',
      'Tapizado capitoné',
      'Eco-cuero fácil de limpiar o pana',
      'Se fabrica en cualquier color del muestrario',
    ],
    opciones: [
      { nombre: 'Camilla lashista', precio: 294000, mercadolibre: 'https://www.mercadolibre.com.ar/camilla-lashita-color-fucsia/p/MLA69851457' },
    ],
    fotos: [
      { imagen: foto('camilla-lashista/01.webp'), tela: 'eco-cuero', color: 'fucsia' },
      { imagen: foto('camilla-lashista/02.webp'), tela: 'eco-cuero', color: 'rosa-claro' },
      { imagen: foto('camilla-lashista/03.webp') },
      { imagen: foto('camilla-lashista/04.webp') },
      { imagen: foto('camilla-lashista/05.webp') },
    ],
    destacado: true,
  },
  {
    slug: 'sillon-camilla-curva',
    nombre: 'Sillón Camilla Curva',
    categoria: 'camillas',
    usos: ['estetica'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Camilla fija de líneas curvas para pestañas, toda capitoné.',
    descripcion:
      'Sillón camilla fijo con forma curva y capitoné completo. Una pieza de diseño para gabinetes de pestañas y cejas que también luce en las fotos.',
    detalles: [
      'Capitoné completo',
      'Estructura fija',
      'Pana antimanchas o eco-cuero',
      'Se fabrica en cualquier color del muestrario',
    ],
    opciones: [
      { nombre: 'Sillón camilla curva', precio: 294000, mercadolibre: 'https://www.mercadolibre.com.ar/sillon-camilla-curva-lashista-capitone--para-pestanas-fija/up/MLAU3438807118' },
    ],
    fotos: [
      { imagen: foto('sillon-camilla-curva/01.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('sillon-camilla-curva/02.webp') },
      { imagen: foto('sillon-camilla-curva/03.webp') },
      { imagen: foto('sillon-camilla-curva/04.webp') },
    ],
  },
  {
    slug: 'silla-giratoria-capitone',
    nombre: 'Silla Giratoria Capitoné',
    categoria: 'sillas',
    usos: ['estetica', 'hogar', 'comercial'],
    telas: ['pana', 'eco-cuero'],
    resumen: 'Silla de escritorio con respaldo capitoné y altura regulable.',
    descripcion:
      'Silla giratoria con ruedas y respaldo capitoné. Ideal para el puesto de trabajo de un salón, un escritorio o un tocador.',
    detalles: [
      'Altura regulable',
      'Base giratoria con ruedas',
      'Respaldo capitoné',
      'Pana antimanchas o eco-cuero',
    ],
    etiquetaOpcion: 'Modelo',
    opciones: [
      { nombre: 'Sin apoyabrazos', precio: 219450, mercadolibre: 'https://www.mercadolibre.com.ar/silla-hidrahulica-para-escritorios-salon-de-belleza-s/up/MLAU3223980820' },
      { nombre: 'Ágata con apoyabrazos', precio: 257450, mercadolibre: 'https://www.mercadolibre.com.ar/silla-sillon-escritorio-agata-ajuste-con-ruedas-color-rosa-te-material-de-tapiceria-terciopelo/p/MLA69856412' },
    ],
    fotos: [
      { imagen: foto('silla-giratoria-capitone/01.webp'), tela: 'pana', color: 'fucsia' },
      { imagen: foto('silla-giratoria-capitone/02.webp'), tela: 'eco-cuero', color: 'marron' },
      { imagen: foto('silla-giratoria-capitone/03.webp'), tela: 'pana', color: 'rosa' },
      { imagen: foto('silla-giratoria-capitone/04.webp'), tela: 'eco-cuero', color: 'rosa' },
      { imagen: foto('silla-giratoria-capitone/05.webp'), tela: 'pana', color: 'violeta-oscuro' },
      { imagen: foto('silla-giratoria-capitone/06.webp'), tela: 'pana', color: 'rosa-viejo' },
      { imagen: foto('silla-giratoria-capitone/07.webp') },
      { imagen: foto('silla-giratoria-capitone/08.webp') },
    ],
  },
  {
    slug: 'banqueta-alta-nordica',
    nombre: 'Banqueta Alta Nórdica',
    categoria: 'sillas',
    usos: ['estetica', 'comercial', 'hogar'],
    telas: ['eco-cuero', 'pana'],
    resumen: 'Banqueta alta con respaldo capitoné y patas de madera.',
    descripcion:
      'Banqueta alta con respaldo capitoné y patas de madera estilo nórdico. Para mostradores, barras e islas de cocina.',
    detalles: [
      '107 cm de alto, 43 cm de ancho y 30 cm de profundidad',
      'Respaldo capitoné',
      'Patas de madera',
      'Eco-cuero o pana',
    ],
    opciones: [
      { nombre: '1 unidad', precio: 138000, mercadolibre: 'https://www.mercadolibre.com.ar/banqueta-mueblesastetik-nordica-107-cm-pana-1-unidad/up/MLAU3431583613' },
    ],
    fotos: [
      { imagen: foto('banqueta-alta-nordica/01.webp'), tela: 'eco-cuero', color: 'fucsia' },
      { imagen: foto('banqueta-alta-nordica/02.webp'), tela: 'eco-cuero', color: 'negro' },
      { imagen: foto('banqueta-alta-nordica/03.webp') },
    ],
  },
];

export const productoPorSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);
export const nombreCategoria = (id: CategoriaId) => CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
export const nombreUso = (id: UsoId) => USOS.find((u) => u.id === id)?.nombre ?? id;
export const precioDesde = (p: Producto) => Math.min(...p.opciones.map((o) => o.precio));

const formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
// Precio comprando directo: el de Mercado Libre menos el descuento, redondeado a mil.
export const precioDirecto = (precio: number) => Math.round((precio * (1 - DESCUENTO_DIRECTO)) / 1000) * 1000;

export const formatoPrecio = (precio: number) => formato.format(precio);
