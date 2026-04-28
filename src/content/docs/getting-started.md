---
title: Getting started
description: Clone Cosmo, install dependencies, and run the dev server.
order: 1
updatedDate: 2026-04-28
---

Cosmo is a minimal Astro starter. This guide walks through scaffolding a new project from the template and running it locally.

## Prerequisites

- Node 22 LTS or higher (see `.nvmrc`)
- A Node package manager: **pnpm** (recommended), **npm**, or **yarn**. Cosmo ships a separate template variant per package manager — pick the one matching your tool below.

## Scaffold and install

With pnpm:

```sh
pnpm create astro@latest -- --template DyslecixDev/cosmo/template-pnpm my-site
cd my-site
pnpm install
```

Or with npm:

```sh
npm create astro@latest -- --template DyslecixDev/cosmo/template-npm my-site
cd my-site
npm install
```

Or with yarn:

```sh
yarn create astro --template DyslecixDev/cosmo/template-yarn my-site
cd my-site
yarn install
```

## Commands

The template ships scripts that work the same with any package manager. With pnpm:

- `pnpm dev` — local dev server with HMR
- `pnpm build` — `astro check` + `astro build`
- `pnpm typecheck` — type-check only (also runs on pre-push)
- `pnpm check` — Biome lint + format
- `pnpm check:fix` — Biome with autofix

Substitute `npm run <script>` or `yarn <script>` if you're not on pnpm.

## Next steps

- Set `site` in `astro.config.mjs` to your production URL
- Update `siteName` and `titleDefault` in `src/components/SEO.astro`
- Replace placeholder hero images in `src/assets/`
- See [rebranding via tokens](/docs/rebranding-via-tokens) to retheme the site
- See [SEO checklist](/docs/seo-checklist) for a complete pre-launch setup
