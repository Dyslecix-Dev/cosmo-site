---
title: Design decisions
description: Why Cosmo is built the way it is — the non-obvious choices and the reasoning behind them.
order: 8
updatedDate: 2026-04-30
---

A running list of "why is this here?" questions for the Cosmo template. If a choice in the codebase looks odd, the answer is probably below.

## Why is `vite` listed as a devDependency?

The `template-npm` and `template-yarn` variants pin `vite` explicitly in `package.json`, even though no app code imports from it. It's a deliberate fix, not boilerplate.

Astro depends on Vite internally, and several plugins (`@tailwindcss/vite`, `@astrojs/mdx`, `vitefu`) do too. npm and Yarn flat-hoist `node_modules`, and when those plugins request slightly different Vite ranges, the resolver can leave two copies of Vite's types in the tree — one hoisted, one nested under `astro/`. `astro check` then fails because TypeScript sees two structurally-identical-but-distinct `Vite.UserConfig` types and can't reconcile them.

Pinning `vite` at the top level forces a single authoritative version, the duplicate disappears, and `astro check` passes.

`template-pnpm` doesn't strictly need the pin — pnpm's isolated `node_modules` layout makes the collision impossible — but the pin ships in all three variants for consistency.

**When upgrading:** the pinned major must match the major Astro itself depends on. Don't bump Vite ahead of Astro; wait for an Astro release that moves to a new Vite major and update both together.

## Why does the CSP allow `'unsafe-inline'` for scripts?

Astro 6 inlines hoisted component `<script>` tags by default. Removing `'unsafe-inline'` would mean managing per-build script hashes (e.g. via `astro-shield`) on every change.

For a static marketing/docs site with no user-rendered HTML, the XSS surface is effectively zero, so the trade isn't worth it here. If you fork Cosmo into something that renders user content, revisit this.

## Why is there no analytics consent banner?

Cosmo uses Cloudflare Web Analytics, which is cookieless and doesn't collect personal data. Under GDPR/ePrivacy, a consent banner is only required when you store or read non-essential identifiers on the user's device — there are none here. No error tracking and no session replay either, by design.

If you swap in a tool that does set cookies or fingerprint visitors (GA, Plausible-self-hosted with cookies, PostHog, Sentry replay), you'll need a banner.

## Why is the GitHub stars badge fetched at build time?

The hero star count is fetched from the GitHub API during `astro build` and baked into the HTML, rather than loaded at runtime from `img.shields.io`.

This keeps the CSP tight (no third-party image host in `img-src`), avoids a render-time network dependency, and means the page has no external requests beyond the Cloudflare beacon. The trade-off is that the count only updates on rebuild — fine for a marketing page.

## Why Biome instead of ESLint + Prettier?

One tool, one config, faster runs. Biome handles both lint and format in a single pass, which keeps Lefthook hooks snappy on pre-commit. There's no deep customization here that would need ESLint's plugin ecosystem.

## Why no view transitions / `ClientRouter`?

Cosmo previously used Astro's `<ClientRouter />` for SPA-style navigation with view transitions. It was removed in 0.3.1 — navigation now falls back to full-page loads, with `<link rel="prefetch">` still warming the next page.

The trade was about predictability over polish. View transitions interact awkwardly with hoisted scripts, theme bootstrap, and any code that runs on initial load — every island has to be re-evaluated against the "what happens on swap?" question, and subtle bugs (animations re-running, listeners doubling up, theme flicker) keep surfacing. For a content site where each page is already fast and prefetched, full-page loads are simpler to reason about and ship fewer foot-guns.

If you want the SPA feel back, re-adding `<ClientRouter />` to `BaseLayout.astro` is a one-line change — just budget time to re-test scripts that assume a fresh document on each navigation.

## Why static output instead of SSR?

`output: "static"` produces a fully pre-rendered site that deploys to Cloudflare Pages with no server runtime. Everything Cosmo does — marketing, docs, MDX pages — is content that can be built ahead of time. SSR would add operational surface (runtime errors, cold starts, log plumbing) for no user-visible benefit.

If you need per-request logic later (auth, personalization, form handlers), Astro lets you opt specific routes into SSR without flipping the whole site.
