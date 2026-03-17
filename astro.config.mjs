import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.terrabahia.com.br',
  integrations: [sitemap()],
  compressHTML: true,
  output: 'static'
});
