// Muestrario: telas y los colores disponibles en cada una.
// Para sumar una tela, agregá un objeto a TELAS. Para sumar un color, una línea en su tela.
// Lista inicial: completar con el muestrario real del taller.

export type Color = { id: string; nombre: string; hex: string };
export type Tela = { id: string; nombre: string; descripcion: string; colores: Color[] };

export const TELAS: Tela[] = [
  {
    id: 'terciopelo',
    nombre: 'Terciopelo',
    descripcion: 'Suave al tacto y con brillo profundo. Ideal para dormitorios, livings y salones que buscan un look elegante.',
    colores: [
      { id: 'negro', nombre: 'Negro', hex: '#1c1b1a' },
      { id: 'gris', nombre: 'Gris topo', hex: '#6d6862' },
      { id: 'beige', nombre: 'Beige', hex: '#d9c3a5' },
      { id: 'crema', nombre: 'Crema', hex: '#efe6d2' },
      { id: 'rosa', nombre: 'Rosa', hex: '#e3a1b0' },
      { id: 'rosa-viejo', nombre: 'Rosa viejo', hex: '#b97f8c' },
      { id: 'fucsia', nombre: 'Fucsia', hex: '#e2127a' },
      { id: 'vino', nombre: 'Vino', hex: '#6e1f33' },
      { id: 'azul', nombre: 'Azul royal', hex: '#1f3fa8' },
      { id: 'verde', nombre: 'Verde esmeralda', hex: '#1d6b55' },
    ],
  },
  {
    id: 'eco-cuero',
    nombre: 'Eco-cuero',
    descripcion: 'Resistente y fácil de limpiar con un paño húmedo. Ideal para uso intensivo en locales, salones y recepciones.',
    colores: [
      { id: 'negro', nombre: 'Negro', hex: '#151413' },
      { id: 'blanco', nombre: 'Blanco', hex: '#f6f4ef' },
      { id: 'crema', nombre: 'Crema', hex: '#ece2cc' },
      { id: 'gris', nombre: 'Gris', hex: '#8a8580' },
    ],
  },
];

export const CANTIDAD_COLORES = '+30';

export const telaPorId = (id: string) => TELAS.find((t) => t.id === id);
export const colorDe = (tela: string, color: string) => telaPorId(tela)?.colores.find((c) => c.id === color);
