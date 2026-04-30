// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import pagefind from "astro-pagefind";

export default defineConfig({
  output: "static",

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
      subsets: ["latin"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Roboto Mono",
      cssVariable: "--font-roboto-mono",
      subsets: ["latin"],
    },
  ],

  site: "https://cosmo.dyslecix.dev",

  integrations: [
    pagefind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      changefreq: /** @type {any} */ ("weekly"),
      serialize(item) {
        if (item.url.endsWith("/privacy/") || item.url.endsWith("/privacy")) {
          return { ...item, changefreq: /** @type {any} */ ("yearly"), priority: 0.3 };
        }
        if (item.url.includes("/docs/")) {
          return { ...item, changefreq: /** @type {any} */ ("monthly"), priority: 0.8 };
        }
        return { ...item, priority: 1.0 };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
});
