# cosmo-site

The marketing and documentation site for the [Cosmo Astro template](https://github.com/DyslecixDev/cosmo). Live at [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev).

This repo is itself scaffolded from the Cosmo template — dogfooding it in production.

## What this site is

Two things:

1. **Landing page** — markets the template with a hero, feature highlights, marquee, and interactive charts.
2. **Docs** — hosts the six canonical guides for the Cosmo template (getting started, rebranding, content collections, RSS, SEO, deployment).

## Stack

- **Astro 6** static output, MDX, sitemap
- **Tailwind CSS v4** via the Vite plugin; design tokens in [src/styles/global.css](src/styles/global.css) under `@theme`
- **TypeScript** (strict) with `@/*` path alias for `src/*`
- **`astro-seo` wrapper** at [src/components/SEO.astro](src/components/SEO.astro)
- **Astro fonts** via Fontsource — Space Mono + Roboto Mono
- **JSON-LD schema** — WebSite + Organization on the homepage; TechArticle + BreadcrumbList on each doc
- **Cloudflare Web Analytics** (cookieless, no consent banner)
- **Biome** for lint + format; **Lefthook** git hooks

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

## Project structure

```
public/
  _headers              # CSP, HSTS, and other security headers
  robots.txt
  theme.js              # Blocking theme + motion bootstrap (prevents FOUC)
  *.png                 # OG images (one per doc + homepage)
src/
  assets/               # Bundled images (icons, constellation, astronaut, etc.)
  components/
    SEO.astro           # astro-seo wrapper with site-wide defaults
    Navbar.astro        # Sticky nav with animated pill indicator and docs dropdown
    Footer.astro        # Footer with nav links and social icons
    sections/           # Landing page sections (Hero, Marquee, Features, Charts)
    navbar/             # MobileMenu, ThemeToggle, MotionToggle, NavDropdown
    docs/               # DocBackground (per-doc themed gradient)
    callouts/           # MDX callout component (note/danger)
  content/docs/         # Six guide MDX/MD files
  content.config.ts     # docs collection schema (zod)
  layouts/
    BaseLayout.astro    # <html> shell — SEO, fonts, Navbar, Footer, ClientRouter
  lib/
    doc-themes.ts       # Maps doc slugs to visual themes
    motion.ts           # Motion preference helpers
  pages/
    index.astro         # Landing page
    privacy.astro       # Privacy policy
    404.astro           # Custom 404
    docs/
      index.astro       # Docs index (card grid)
      [slug].astro      # Doc detail (TOC, prev/next, edit-on-GitHub, schema)
  styles/global.css     # Tailwind base + @theme design tokens
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
