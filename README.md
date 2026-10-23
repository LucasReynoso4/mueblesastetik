# Muebles Astetik

Sitio web de Muebles Astetik: muebles tapizados a medida (sillones, puffs, mostradores, respaldos y camillas).
Hecho con [Astro](https://astro.build) y Tailwind CSS. Se publica en Netlify.

## Cómo correrlo

Necesitás Node 22.23 o más nuevo (o Node 24).

```sh
npm install
npm run dev      # sitio local en http://localhost:4321
npm run build    # revisa tipos y genera dist/
npm run preview  # sirve dist/ para probar
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| WhatsApp, Instagram, Mercado Libre, cifras de la portada | `src/data/sitio.ts` |
| Productos del catálogo | `src/data/productos.ts` |
| Telas y colores | `src/data/colores.ts` |
| Fotos de productos | `src/assets/productos/` |
| Páginas | `src/pages/` |
| Colores de marca y tipografías | `src/styles/global.css` |

### Agregar un producto

1. Copiá la foto a `src/assets/productos/` (JPG o PNG, idealmente de 1000 px o más).
2. En `src/data/productos.ts`, importala arriba y agregá un objeto a `PRODUCTOS` con nombre, categoría, usos,
   tela y color de la foto, descripción y detalles. Si tiene publicación en Mercado Libre, poné el link en `mercadolibre`.

La página del producto, el catálogo, los filtros, los relacionados y el sitemap se actualizan solos.
Las fotos se optimizan automáticamente (AVIF/WebP en varios tamaños).

### Agregar una tela o un color

En `src/data/colores.ts`: una tela nueva es un objeto en `TELAS`; un color nuevo es una línea dentro de su tela.

## Funciones principales

- **Catálogo con filtros** por categoría y por uso (hogar, estética, locales). Los filtros quedan en la URL,
  así que se pueden compartir links como `/catalogo?categoria=puffs`.
- **Ficha de producto** con selector de tela y color. El botón de WhatsApp manda el modelo, la tela y el color elegidos.
- **Lista de consulta**: el cliente suma varios productos y manda un solo WhatsApp con todo.
- **Página para salones** (`/estetica`) armada por ambiente: recepción, sala de espera y gabinete.
- **SEO**: títulos y descripciones por página, vista previa al compartir (Open Graph), datos estructurados
  (negocio, productos, preguntas frecuentes) y sitemap.
