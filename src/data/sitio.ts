// Datos de contacto y del negocio. Todo lo que cambia seguido está acá.

// La página se publica dos veces desde este mismo código:
// - Página principal (suegro): precio directo comparado con Mercado Libre, WhatsApp 11 3669-0128.
// - Catálogo (suegra): mismos muebles SIN precios ni Mercado Libre, WhatsApp 11 3571-0615.
//   Se activa con la variable de entorno PUBLIC_MODO=catalogo (en el sitio de Netlify del catálogo).
export const MODO_CATALOGO = import.meta.env.PUBLIC_MODO === 'catalogo';

const WHATSAPP_PRINCIPAL = { whatsapp: '5491136690128', whatsappVisible: '+54 9 11 3669-0128' };
const WHATSAPP_CATALOGO = { whatsapp: '5491135710615', whatsappVisible: '+54 9 11 3571-0615' };

export const SITIO = {
  nombre: 'Muebles Astetik',
  url: 'https://mueblesastetik.netlify.app',
  descripcion:
    'Muebles tapizados a medida: sillones, puffs, mostradores, respaldos y camillas capitoné. Más de 30 colores. Envíos a todo el país.',
  ...(MODO_CATALOGO ? WHATSAPP_CATALOGO : WHATSAPP_PRINCIPAL),
  instagram: 'https://www.instagram.com/mueblesastetik/',
  instagramUsuario: '@mueblesastetik',
  mercadolibre: 'https://www.mercadolibre.com.ar/pagina/mueblesastetik',
  horario: 'Lunes a sábado',
  ubicacion: 'Buenos Aires, Argentina',
};

// Descuento por comprar directo (transferencia o efectivo) sobre el precio de Mercado Libre.
// 0.05 = 5% menos (con el envío a cargo del comprador). Antes fue 15%. Con 0 se muestra solo el precio de Mercado Libre.
export const DESCUENTO_DIRECTO = 0.05;

// Cifras que se muestran en la página. Revisar que sigan siendo ciertas.
export const CIFRAS = [
  { valor: '+1000', etiqueta: 'Ventas en Mercado Libre' },
  { valor: '5★', etiqueta: 'Calificación de compradores' },
  { valor: '+10', etiqueta: 'Años fabricando' },
  { valor: '+30', etiqueta: 'Colores y telas' },
];

export function linkWhatsApp(mensaje: string) {
  return `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const MENSAJE_GENERAL = '¡Hola! Vi su página web y me gustaría recibir más información sobre sus muebles.';
