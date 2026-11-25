import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://entremates.es',
  integrations: [react()],
  vite: {
    optimizeDeps: { include: ['jspdf'] }
  },
  output: 'static'
});
