import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
output: 'server',
 viewTransitions: true,
  adapter: netlify(),
  integrations: [react(), tailwind()],
  
  vite: {
    define: {
      'process.env': {}
    }
  }
 
});
