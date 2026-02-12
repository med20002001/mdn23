import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.mdn23.com",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), tailwind()]
});
