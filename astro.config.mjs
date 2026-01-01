import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "hybrid", 
  adapter: cloudflare(),

  integrations: [
    react(),
    tailwind()
  ]
});
