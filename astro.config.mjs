import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "static",
  adapter: netlify(),
  viewTransitions: true,

  integrations: [
    react(),
    tailwind()
  ]
});
