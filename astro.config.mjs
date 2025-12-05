import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [react(), tailwind()],
    site: "https://mdn-association1.netlify.app",
  vite: {
    define: {
      'process.env': {}
    }
  }
});
