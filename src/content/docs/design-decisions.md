---
title: Design decisions
description: Some explanations regarding the Cosmo template and this site.
order: 8
updatedDate: 2026-05-05
---

## Cosmo template FAQ

### Why static output instead of SSR?

The goal of Cosmo was to create a template specifically for static sites built on Astro, which specializes in that sort of tech. If you plan on using SSR, consider looking at other tools, such as [Next.js](https://nextjs.org/) and [Nuxt.js](https://nuxt.com/).

### Why Biome instead of ESLint + Prettier?

One tool, one config, and it runs faster. It also dodges the deep customization reliant on ESLint's config and Prettier's plugin ecosystem.

### Why is `vite` listed as a devDependency?

Astro depends on Vite internally, and several plugins (`@tailwindcss/vite`, `@astrojs/mdx`, `vitefu`) do too. npm and yarn flat-hoist `node_modules`, and when those plugins request slightly different Vite ranges, the resolver can leave two copies of Vite's types in the tree: one hoisted and one nested under `astro/`. `astro check` then fails because TypeScript sees two structurally identical, but distinct, `Vite.UserConfig` types and can't reconcile them.

Pinning `vite` at the top level forces a single authoritative version, the duplicate disappears, and `astro check` passes.

**When upgrading:** Wait for an Astro release that moves to a new Vite major and update both together.

### Why no view transitions / `ClientRouter`?

Cosmo previously used Astro's `<ClientRouter />` for SPA-style navigation with view transitions. It was removed in 0.3.1, but navigation now falls back to full-page loads with `<link rel="prefetch">` still warming the next page.

The trade was about predictability over polish. View transitions interact awkwardly with hoisted scripts, theme bootstrap, and any code that runs on initial load. Additionally, there were subtle bugs (animations re-running, listeners doubling up, theme flicker) in Safari.

This site layers a "curtain" page transition on top of the full-page loads, which lives in `BaseLayout.astro` and `global.css`.

If you want the SPA feel back, re-adding `<ClientRouter />` to `BaseLayout.astro` is a one-line change — just budget time to re-test scripts that assume a fresh document on each navigation.

### Why does the CSP allow `'unsafe-inline'` for scripts?

Astro 6 inlines hoisted component `<script>` tags by default. Removing `'unsafe-inline'` would mean managing per-build script hashes (via `astro-shield`) on every change.

For a static marketing/docs site with no user-rendered HTML, the XSS surface is effectively zero, so the trade isn't worth it here. If you fork Cosmo into something that renders user content, revisit this.

## This site FAQ

### Why is there no cookie consent banner?

This site uses Cloudflare Web Analytics, which is cookieless and doesn't collect personal data. There is no error tracking and no session replay either by design.

### Why is the GitHub stars badge cached?

The hero star count lives in `src/data/stars.json`. A daily GitHub Action (`.github/workflows/update-stars.yml`) hits the GitHub API, writes the count back to that file, and commits it. The Hero reads the JSON at build time and bakes the number into the HTML.

This keeps the CSP tight (no third-party image host in `img-src`), avoids a render-time network dependency, and means the page has no external requests beyond the Cloudflare beacon. The trade-off is that the count only updates once per day plus on rebuild.
