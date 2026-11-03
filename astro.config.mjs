// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // En Netlify, URL es la dirección del sitio que se está publicando (principal o catálogo).
  site: process.env.URL ?? 'https://mueblesastetik.netlify.app',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
