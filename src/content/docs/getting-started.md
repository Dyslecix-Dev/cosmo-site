---
title: Getting started
description: Clone cosmo, install dependencies, and run the dev server.
order: 1
---

Cosmo is a minimal Astro starter. This guide walks through cloning the repo and running it locally.

## Prerequisites

- Node 22 LTS or higher (see `.nvmrc`)
- pnpm — cosmo uses `pnpm-lock.yaml`; do not substitute npm or yarn

## Scaffold and install

```sh
pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template my-site
cd my-site
pnpm install
```

## Commands

- `pnpm dev` — local dev server with HMR
- `pnpm build` — `astro check` + `astro build`
- `pnpm typecheck` — type-check only (also runs on pre-push)
- `pnpm check` — Biome lint + format
- `pnpm check:fix` — Biome with autofix

## Next steps

- Set `site` in `astro.config.mjs` to your production URL
- Update `siteName` and `titleDefault` in `src/components/SEO.astro`
- Replace placeholder hero images in `src/assets/`
- See [rebranding via tokens](/docs/rebranding-via-tokens) to retheme the site
- See [SEO checklist](/docs/seo-checklist) for a complete pre-launch setup
