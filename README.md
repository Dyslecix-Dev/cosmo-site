# cosmo-site

The marketing and documentation site for the [Cosmo Astro template](https://github.com/DyslecixDev/cosmo). Live at [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev).

This repo is itself scaffolded from the Cosmo template — dogfooding it in production.

## What this site is

Three things:

1. **Landing page** — markets the template with a hero, marquee, feature highlights, interactive charts, and a Mission Control section linking to the about pages.
2. **Docs** — hosts the eight canonical guides for the Cosmo template (getting started, rebranding, managing content collections, RSS, SEO, deployment, recommended integrations, design decisions). Pagefind powers the in-site search.
3. **About pages** — `/blueprint` (how this site was built on top of Cosmo) and `/roadmap` (what's planned next for the template).

## Stack

- **Astro 6** static output, MDX, sitemap
- **Tailwind CSS v4** via the Vite plugin; design tokens in [src/styles/global.css](src/styles/global.css) under `@theme`
- **TypeScript** (strict) with `@/*` path alias for `src/*`
- **`astro-seo` wrapper** at [src/components/SEO.astro](src/components/SEO.astro)
- **Astro fonts** via Fontsource — Space Mono + Roboto Mono (latin subset only)
- **Pagefind** static search via `astro-pagefind` — drives the navbar search panel
- **OG images** generated at build time by `astro-og-canvas` ([src/pages/open-graph/[...route].ts](src/pages/open-graph/%5B...route%5D.ts)) — one per doc, plus homepage/blueprint/roadmap/privacy
- **JSON-LD schema** — WebSite + Organization on the homepage; TechArticle + BreadcrumbList on each doc
- **Cloudflare Web Analytics** (cookieless, no consent banner)
- **Curtain page transition** — full-page nav with a layered curtain animation (replaces `@view-transition`); gated behind `prefers-reduced-motion`
- **GitHub stars cache** — `src/data/stars.json` is refreshed daily by the `update-stars.yml` GitHub Action and read at build time by the Hero
- **Biome** for lint + format; **Lefthook** git hooks (Biome on pre-commit, `astro check` on pre-push)
- **Lychee** link checking in CI (and via `pnpm check:links` locally with Docker)

## Requirements

- **Node 22+** (see [.nvmrc](.nvmrc))
- **pnpm** — `pnpm-lock.yaml` is authoritative

## Commands

| Command          | Action                                    |
| :--------------- | :---------------------------------------- |
| `pnpm dev`       | Start dev server at `localhost:4321`      |
| `pnpm build`     | Typecheck then build to `./dist/`         |
| `pnpm preview`   | Preview the built site locally            |
| `pnpm typecheck` | Run `astro check`                         |
| `pnpm check`     | Lint + format with Biome (read-only)      |
| `pnpm check:fix` | Lint + format with Biome, apply fixes     |
| `pnpm check:links` | Run Lychee link checker over `dist/` via Docker |

## Project structure

```
public/
  _headers              # CSP, HSTS, and other security headers
  robots.txt
  theme.js              # Blocking theme + motion bootstrap (prevents flash of unstyled content)
  favicon.{ico,svg}
src/
  assets/               # Bundled images (icons, constellation, astronaut, etc.)
  data/
    stars.json          # Cached GitHub star count, refreshed daily by .github/workflows/update-stars.yml
  components/
    SEO.astro           # astro-seo wrapper with site-wide defaults
    Navbar.astro        # Sticky nav with animated pill indicator, About dropdown, search toggle
    Footer.astro        # Footer with nav links and social icons
    KoFiPopover.astro   # Dismissible Ko-fi support popover (sessionStorage)
    NoCookieBanner.astro # Dismissible "cookieless analytics" banner (localStorage)
    sections/           # Landing page sections (Hero, Marquee, Features, Charts, MissionControl)
    navbar/             # MobileMenu, ThemeToggle, MotionToggle, NavDropdown, AboutDropdown, SearchPanel, SearchToggle
    docs/               # DocBackground (per-doc themed gradient)
    callouts/           # MDX callout component (note/tip/warning/danger)
    tabs/               # Tabs + TabItem (used for pnpm/npm/yarn install command tabs in docs)
  content/docs/         # Eight guide MDX/MD files
  content.config.ts     # docs collection schema (zod)
  layouts/
    BaseLayout.astro          # <html> shell — SEO, fonts, Navbar, Footer, curtain transition, popovers
    EventHorizonLayout.astro  # MDX layout for /blueprint
    PortholeLayout.astro      # MDX layout for /roadmap
  lib/
    doc-themes.ts       # Maps doc slugs to visual themes
    motion.ts           # Motion preference helpers
  pages/
    index.astro         # Landing page
    blueprint.mdx       # "Built with Cosmo" — diff between this site and the template
    roadmap.mdx         # What's next for the Cosmo template
    privacy.astro       # Privacy policy
    404.astro           # Custom 404
    docs/
      index.astro       # Docs index (card grid)
      [slug].astro      # Doc detail (TOC, prev/next, edit-on-GitHub, schema)
    open-graph/
      [...route].ts     # astro-og-canvas route — generates OG PNGs for each page/doc at build
  styles/global.css     # Tailwind base + @theme design tokens + curtain transition CSS
.github/workflows/
  ci.yml                # Typecheck, build, and Lychee link check
  code-quality.yml      # Biome CI
  update-stars.yml      # Daily cron — fetches GitHub star count and commits stars.json
astro.config.mjs
biome.json
lefthook.yml
tsconfig.json
```

## Deploying

Hosted on Cloudflare Pages. Build settings:

- **Install:** `pnpm install --frozen-lockfile`
- **Build:** `pnpm build`
- **Output:** `dist`
- **Node:** `22`

DNS is managed through Namecheap (not proxied through Cloudflare), so the Cloudflare Web Analytics beacon is injected manually in [BaseLayout.astro](src/layouts/BaseLayout.astro).
