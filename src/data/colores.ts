// Muestrario: telas y los colores disponibles en cada una.
// Para sumar una tela, agregá un objeto a TELAS. Para sumar un color, una línea en su tela.
// Colores tomados de las publicaciones de Mercado Libre (octubre 2026). Los hex son aproximados.

import type { ImageMetadata } from 'astro';
import muestrarioPana from '../assets/muestrario-pana.webp';
import muestrarioTaller from '../assets/muestrario-taller.webp';

export type Color = { id: string; nombre: string; hex: string };
export type Tela = { id: string; nombre: string; descripcion: string; colores: Color[]; fotos?: { imagen: ImageMetadata; alt: string }[] };

export const TELAS: Tela[] = [
  {
    id: 'pana',
    nombre: 'Pana',
    descripcion: 'Pana antimanchas, suave al tacto y con brillo profundo. La más elegida para dormitorios, livings y salones.',
    colores: [
      { id: 'negro', nombre: 'Negro', hex: '#1c1b1d' },
      { id: 'gris-oscuro', nombre: 'Gris oscuro', hex: '#4a4c51' },
      { id: 'gris', nombre: 'Gris', hex: '#8e8f92' },
      { id: 'blanco', nombre: 'Blanco', hex: '#f3f0e8' },
      { id: 'natural', nombre: 'Natural', hex: '#e9e0cc' },
      { id: 'beige', nombre: 'Beige', hex: '#d3c0a3' },
      { id: 'vizon', nombre: 'Vizón', hex: '#9a8c7b' },
      { id: 'rosa-claro', nombre: 'Rosa claro', hex: '#ecc3c3' },
      { id: 'rosa', nombre: 'Rosa', hex: '#e6a2b3' },
      { id: 'rosa-viejo', nombre: 'Rosa viejo', hex: '#c38c97' },
      { id: 'fucsia', nombre: 'Fucsia', hex: '#d81f7d' },
      { id: 'rojo', nombre: 'Rojo', hex: '#c0182d' },
      { id: 'bordo', nombre: 'Bordó', hex: '#6c1427' },
      { id: 'naranja', nombre: 'Naranja', hex: '#e2682c' },
      { id: 'amarillo', nombre: 'Amarillo', hex: '#e6b621' },
      { id: 'verde-esmeralda', nombre: 'Verde esmeralda', hex: '#167a5c' },
      { id: 'verde-ingles', nombre: 'Verde inglés', hex: '#1f4a38' },
      { id: 'turquesa', nombre: 'Turquesa', hex: '#26ada6' },
      { id: 'celeste', nombre: 'Celeste', hex: '#6cc3e3' },
      { id: 'azul-francia', nombre: 'Azul Francia', hex: '#2446b3' },
      { id: 'azul-oscuro', nombre: 'Azul oscuro', hex: '#1d2a4e' },
      { id: 'lila', nombre: 'Lila', hex: '#b39ad2' },
      { id: 'violeta', nombre: 'Violeta', hex: '#6a3e9f' },
      { id: 'violeta-oscuro', nombre: 'Violeta oscuro', hex: '#45235d' },
    ],
    fotos: [
      { imagen: muestrarioTaller, alt: 'Muestras de pana en el taller' },
      { imagen: muestrarioPana, alt: 'Muestrario de pana antimanchas' },
    ],
  },
  {
    id: 'eco-cuero',
    nombre: 'Eco-cuero',
    descripcion: 'Resistente y fácil de limpiar con un paño húmedo. Ideal para uso intensivo en locales, salones y camillas.',
    colores: [
      { id: 'negro', nombre: 'Negro', hex: '#151413' },
      { id: 'blanco', nombre: 'Blanco', hex: '#f6f4ef' },
      { id: 'beige', nombre: 'Beige', hex: '#d9c6a6' },
      { id: 'marron', nombre: 'Marrón', hex: '#5b3a27' },
      { id: 'rosa-claro', nombre: 'Rosa claro', hex: '#efc6c8' },
      { id: 'rosa', nombre: 'Rosa', hex: '#e3a0b0' },
      { id: 'rosa-gold', nombre: 'Rosa gold', hex: '#d9a596' },
      { id: 'fucsia', nombre: 'Fucsia', hex: '#d4157a' },
      { id: 'verde-ingles', nombre: 'Verde inglés', hex: '#1e4636' },
      { id: 'violeta', nombre: 'Violeta', hex: '#61388f' },
    ],
  },
];

export const CANTIDAD_COLORES = '+30';

export const telaPorId = (id: string) => TELAS.find((t) => t.id === id);
export const colorDe = (tela: string, color: string) => telaPorId(tela)?.colores.find((c) => c.id === color);
