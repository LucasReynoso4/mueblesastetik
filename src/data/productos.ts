// Catálogo. Para sumar un producto:
// 1. Copiá la foto en src/assets/productos/
// 2. Importala abajo y agregá un objeto a PRODUCTOS.
// La página del producto, el catálogo, los filtros y el sitemap se generan solos.

import type { ImageMetadata } from 'astro';

import camillaRosa from '../assets/productos/camillaRosa.jpg';
import mostrador from '../assets/productos/mostrador.jpg';
import mostradorLocal from '../assets/productos/mostradorLocal.jpg';
import mostradorRosa from '../assets/productos/mostradorRosa.jpg';
import puffAzul from '../assets/productos/puffAzul.jpg';
import puffNegro from '../assets/productos/puffNegro.jpg';
import puffRosa from '../assets/productos/puffRosa.jpg';
import respaldo from '../assets/productos/respaldo.jpg';
import respaldoFlor from '../assets/productos/respaldoFlor.jpg';
import sillon from '../assets/productos/sillon.jpg';
import sillonLabios from '../assets/productos/sillonLabios.jpg';
import sillonRedondo from '../assets/productos/sillonRedondo.jpg';

export const CATEGORIAS = [
  { id: 'sillones', nombre: 'Sillones' },
  { id: 'puffs', nombre: 'Puffs' },
  { id: 'mostradores', nombre: 'Mostradores' },
  { id: 'respaldos', nombre: 'Respaldos' },
  { id: 'camillas', nombre: 'Camillas' },
] as const;

export const USOS = [
  { id: 'hogar', nombre: 'Hogar' },
  { id: 'estetica', nombre: 'Estética y spa' },
  { id: 'comercial', nombre: 'Locales comerciales' },
] as const;

export type CategoriaId = (typeof CATEGORIAS)[number]['id'];
export type UsoId = (typeof USOS)[number]['id'];

export type Producto = {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  usos: UsoId[];
  /** Tela y color del mueble en la foto principal (ids de src/data/colores.ts) */
  foto: { tela: string; color: string };
  /** Telas en las que se fabrica. Si no se indica, todas. */
  telas?: string[];
  resumen: string;
  descripcion: string;
  detalles: string[];
  imagenes: ImageMetadata[];
  destacado?: boolean;
  /** Link a la publicación en Mercado Libre, si existe */
  mercadolibre?: string;
};

export const PRODUCTOS: Producto[] = [
  {
    slug: 'sillon-redondo-capitone',
    nombre: 'Sillón Redondo Capitoné',
    categoria: 'sillones',
    usos: ['hogar', 'estetica', 'comercial'],
    foto: { tela: 'eco-cuero', color: 'crema' },
    resumen: 'Sillón circular con respaldo envolvente y almohadones sueltos.',
    descripcion:
      'Un sillón que se convierte en el centro de cualquier ambiente. Asiento redondo capitoné con respaldo envolvente, ideal para livings amplios, salas de espera o vidrieras.',
    detalles: ['Asiento capitoné con botones forrados', 'Almohadones sueltos incluidos', 'Fabricado a medida en la tela y el color que elijas'],
    imagenes: [sillonRedondo],
    destacado: true,
  },
  {
    slug: 'sillon-labios',
    nombre: 'Sillón Labios',
    categoria: 'sillones',
    usos: ['hogar', 'estetica', 'comercial'],
    foto: { tela: 'terciopelo', color: 'fucsia' },
    telas: ['terciopelo'],
    resumen: 'El clásico sillón con forma de labios, en terciopelo.',
    descripcion:
      'Un diseño icónico que no pasa desapercibido. Perfecto para salones de belleza, locales de ropa, cuartos juveniles o como pieza de diseño en el living.',
    detalles: ['Tapizado en terciopelo', 'Estructura reforzada', 'Fabricado a medida en el color que elijas'],
    imagenes: [sillonLabios],
    destacado: true,
  },
  {
    slug: 'sillon-barrel-capitone',
    nombre: 'Sillón Barrel Capitoné',
    categoria: 'sillones',
    usos: ['hogar', 'estetica'],
    foto: { tela: 'terciopelo', color: 'rosa-viejo' },
    resumen: 'Sillón de respaldo alto capitoné con tachas y patas metálicas.',
    descripcion:
      'Sillón individual de respaldo alto con capitoné y terminación de tachas. Suma elegancia a un dormitorio, un rincón de lectura o la recepción de un local.',
    detalles: ['Respaldo alto capitoné', 'Terminación con tachas', 'Patas metálicas', 'Fabricado a medida en la tela y el color que elijas'],
    imagenes: [sillon],
  },
  {
    slug: 'puff-redondo-capitone',
    nombre: 'Puff Redondo Capitoné',
    categoria: 'puffs',
    usos: ['hogar', 'estetica', 'comercial'],
    foto: { tela: 'terciopelo', color: 'azul' },
    resumen: 'Puff circular grande, capitoné completo con tachas.',
    descripcion:
      'Puff de gran tamaño con capitoné en toda la superficie y borde de tachas. Funciona como asiento central en salas de espera, probadores y livings.',
    detalles: ['Capitoné en toda la superficie', 'Borde con tachas', 'Fabricado a medida en la tela, color y tamaño que elijas'],
    imagenes: [puffAzul],
    destacado: true,
  },
  {
    slug: 'puff-capitone-con-patas',
    nombre: 'Puff Capitoné con Patas',
    categoria: 'puffs',
    usos: ['hogar', 'comercial'],
    foto: { tela: 'terciopelo', color: 'gris' },
    resumen: 'Puff redondo con tapa capitoné, tachas y patas metálicas.',
    descripcion:
      'Puff redondo con tapa capitoné y terminación de tachas, sobre patas metálicas. Un complemento versátil para el living, el dormitorio o un probador.',
    detalles: ['Tapa capitoné', 'Terminación con tachas', 'Patas metálicas', 'Fabricado a medida en la tela y el color que elijas'],
    imagenes: [puffNegro],
  },
  {
    slug: 'puff-terciopelo',
    nombre: 'Puff de Terciopelo',
    categoria: 'puffs',
    usos: ['hogar', 'estetica'],
    foto: { tela: 'terciopelo', color: 'rosa' },
    telas: ['terciopelo'],
    resumen: 'Puff alto de terciopelo con tapa capitoné y patas metálicas.',
    descripcion:
      'Puff alto en terciopelo con tapa capitoné y borde de tachas. Ideal como banqueta de tocador, en el dormitorio o en el puesto de trabajo de un salón.',
    detalles: ['Tapizado en terciopelo', 'Tapa capitoné con tachas', 'Patas metálicas', 'Fabricado a medida en el color que elijas'],
    imagenes: [puffRosa],
  },
  {
    slug: 'mostrador-capitone',
    nombre: 'Mostrador Capitoné',
    categoria: 'mostradores',
    usos: ['estetica', 'comercial'],
    foto: { tela: 'terciopelo', color: 'negro' },
    resumen: 'Mostrador de recepción con frente capitoné.',
    descripcion:
      'La primera impresión de tu local. Mostrador de recepción con frente capitoné, pensado para centros de estética, peluquerías, consultorios y showrooms.',
    detalles: ['Frente capitoné', 'Medidas a pedido según tu espacio', 'Fabricado en la tela y el color que elijas'],
    imagenes: [mostrador],
    destacado: true,
  },
  {
    slug: 'mostrador-capitone-con-puffs',
    nombre: 'Mostrador Capitoné con Puffs',
    categoria: 'mostradores',
    usos: ['estetica', 'comercial'],
    foto: { tela: 'terciopelo', color: 'fucsia' },
    resumen: 'Mostrador capitoné con puffs al tono, listo para tu recepción.',
    descripcion:
      'Combo de mostrador capitoné con puffs haciendo juego. Una recepción completa con identidad propia para salones de belleza, uñas y pestañas.',
    detalles: ['Mostrador con frente capitoné', 'Puffs al tono', 'Medidas a pedido según tu espacio', 'Fabricado en la tela y el color que elijas'],
    imagenes: [mostradorRosa],
  },
  {
    slug: 'mostrador-curvo-capitone',
    nombre: 'Mostrador Curvo Capitoné',
    categoria: 'mostradores',
    usos: ['comercial', 'estetica'],
    foto: { tela: 'terciopelo', color: 'beige' },
    resumen: 'Mostrador de líneas curvas, ideal para boutiques y showrooms.',
    descripcion:
      'Mostrador capitoné de líneas suaves que acompaña la estética de boutiques, showrooms y locales de indumentaria.',
    detalles: ['Frente capitoné', 'Diseño curvo', 'Medidas a pedido según tu espacio', 'Fabricado en la tela y el color que elijas'],
    imagenes: [mostradorLocal],
  },
  {
    slug: 'respaldo-capitone-clasico',
    nombre: 'Respaldo Capitoné Clásico',
    categoria: 'respaldos',
    usos: ['hogar'],
    foto: { tela: 'terciopelo', color: 'gris' },
    resumen: 'Respaldo de cama capitoné con terminación de tachas.',
    descripcion:
      'Un clásico que nunca falla. Respaldo capitoné con tachas y relleno de alta densidad, para darle carácter y confort al dormitorio.',
    detalles: ['Capitoné con tachas', 'Relleno de alta densidad', 'A medida para cualquier tamaño de cama', 'Fabricado en la tela y el color que elijas'],
    imagenes: [respaldo],
    destacado: true,
  },
  {
    slug: 'respaldo-petalo',
    nombre: 'Respaldo Pétalo',
    categoria: 'respaldos',
    usos: ['hogar'],
    foto: { tela: 'terciopelo', color: 'rosa' },
    telas: ['terciopelo'],
    resumen: 'Respaldo de cama con gajos en forma de pétalo, en terciopelo.',
    descripcion:
      'Diseño exclusivo con gajos en forma de pétalo. Un respaldo protagonista para dormitorios con personalidad.',
    detalles: ['Tapizado en terciopelo', 'Relleno de alta densidad', 'A medida para cualquier tamaño de cama', 'Fabricado en el color que elijas'],
    imagenes: [respaldoFlor],
  },
  {
    slug: 'camilla-capitone',
    nombre: 'Camilla Capitoné',
    categoria: 'camillas',
    usos: ['estetica'],
    foto: { tela: 'terciopelo', color: 'fucsia' },
    resumen: 'Camilla ergonómica capitoné para pestañas, cejas y spa.',
    descripcion:
      'Camilla de diseño ergonómico tapizada en capitoné. Cómoda para tus clientas y fácil de limpiar, ideal para lifting de pestañas, cejas, masajes y spa.',
    detalles: ['Diseño ergonómico', 'Tapizado capitoné', 'Fabricada a medida en la tela y el color que elijas'],
    imagenes: [camillaRosa],
    destacado: true,
  },
];

export const productoPorSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);
export const nombreCategoria = (id: CategoriaId) => CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
export const nombreUso = (id: UsoId) => USOS.find((u) => u.id === id)?.nombre ?? id;
