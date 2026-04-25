# Cosmo

A minimal, use-case-agnostic [Astro](https://astro.build) static site boilerplate. Scaffold it and ship a blog, docs site, landing page, storefront, or portfolio — without spending the first day wiring up SEO, content collections, and formatting.

Live demo: [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev)

## What's included

- **Astro 6** with static output
- **Tailwind CSS v4** via the Vite plugin, with design tokens under `@theme` in [src/styles/global.css](src/styles/global.css)
- **`@tailwindcss/typography`** for prose styling on long-form content
- **TypeScript** (strict) with `@/*` path alias for `src/*`
- **MDX, RSS, and sitemap** integrations pre-wired
- **`astro-seo` wrapper** with sensible defaults (OG, Twitter card, canonical URL)
- **Content collections** with example `blog` and `docs` collections, dynamic routes, and tag taxonomy
- **Blog presentation patterns** — paginated index, card grid, detail page with TOC, reading time, prev/next, related entries
- **MDX callouts** (note/danger) for use inside content
- **Sticky navbar** with animated docs dropdown and a class-based **dark mode** toggle (no FOUC)
- **Custom 404 page**
- **View transitions** via Astro's `ClientRouter`
- **Astro fonts** (`astro:assets` `Font` component) via the Fontsource provider — Space Mono + Roboto Mono
- **Link prefetch** enabled by default for faster client-side navigation
- **JSON-LD schema** (`WebSite`) auto-generated and customizable via slots
- **Accessibility**: skip-to-main link, semantic `<time>` elements, `aria-current` nav indicators
- **Draft support** on content collections — set `draft: true` to write without publishing
- **Biome** for lint + format (one tool, no ESLint/Prettier)
- **Lefthook** git hooks — biome on pre-commit, typecheck on pre-push

## Requirements

- **Node 22 LTS or higher** (see [.nvmrc](.nvmrc))
- **pnpm** (the repo is pnpm-only; `pnpm-lock.yaml` is the source of truth)

## Quick start

```sh
pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template my-site
cd my-site
pnpm install
pnpm dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Scripts

All commands run from the project root:

| Command             | Action                                      |
| :------------------ | :------------------------------------------ |
| `pnpm dev`          | Start the dev server at `localhost:4321`    |
| `pnpm build`        | Typecheck and build the site to `./dist/`   |
| `pnpm preview`      | Preview the built site locally              |
| `pnpm typecheck`    | Run `astro check` (also runs on pre-push)   |
| `pnpm check`        | Lint + format with Biome (no writes)        |
| `pnpm check:fix`    | Lint + format with Biome, applying fixes    |
| `pnpm astro ...`    | Pass-through to the Astro CLI               |

## Project structure

```
.
├── .env.example              # Empty stub — duplicate to .env.local for any secrets you add
├── public/                   # Static assets (favicons, OG images, robots.txt, brand images)
├── src/
│   ├── assets/               # Bundled images (placeholder hero + OG fallback)
│   ├── components/
│   │   ├── Navbar.astro      # Sticky nav, docs dropdown, dark-mode toggle
│   │   ├── SEO.astro         # astro-seo wrapper with centralized defaults
│   │   ├── blog/EntryCard.astro
│   │   └── callouts/Callout.astro  # MDX note/danger callouts
│   ├── content/              # Content collections (blog + docs)
│   ├── content.config.ts     # Collection schemas (zod)
│   ├── layouts/
│   │   ├── BaseLayout.astro  # <html> shell, fonts, SEO, ClientRouter
│   │   └── BlogPost.astro    # TOC, reading time, prev/next, related
│   ├── lib/                  # reading-time, related-entries
│   ├── pages/                # File-based routes
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── blog/             # [...page], [...slug], tags/
│   │   ├── docs/[slug].astro
│   │   └── rss.xml.js        # Wired to the blog collection
│   └── styles/global.css     # Tailwind + design tokens
├── astro.config.mjs
├── biome.json
├── lefthook.yml
└── tsconfig.json
```

## Customizing your site

The bundled `docs` collection ships comprehensive guides for the common adoption tasks — start there:

- **[Getting started](src/content/docs/getting-started.md)** — clone, install, run.
- **[Rebranding via tokens](src/content/docs/rebranding-via-tokens.mdx)** — swap colors, fonts, and spacing by editing `@theme` design tokens in `src/styles/global.css`.
- **[Adding a content collection](src/content/docs/adding-a-content-collection.mdx)** — define a new collection with a zod schema and render it.
- **[Wiring RSS](src/content/docs/wiring-rss.md)** — point the RSS feed at your collection.
- **[SEO checklist](src/content/docs/seo-checklist.mdx)** — what to set in `astro.config.mjs`, `SEO.astro`, and `robots.txt` before you ship.
- **[Deploying](src/content/docs/deploying.mdx)** — full setup for Cloudflare Pages, GitHub Pages, Netlify, and Vercel.

Run `pnpm dev` and visit [/docs](http://localhost:4321/docs) to read them in-browser.

The example `blog` collection (10 lorem-ipsum entries with tags) is there to demonstrate the index, detail, pagination, tag taxonomy, related-entries, and RSS pieces. Delete the seed entries and write your own — or strip the entire `blog/` collection if you don't need it.

## Content collections

Two example collections ship out of the box:

- **`blog`** — chronological posts (`pubDate`, `description`, optional `heroImage` + `tags`). Routes: paginated index at `/blog`, detail at `/blog/[slug]`, and tag taxonomy under `/blog/tags/`.
- **`docs`** — evergreen guides with sibling `order`. Route: `/docs/[slug]`.

Both follow the same pattern — a zod schema in [src/content.config.ts](src/content.config.ts) plus pages that call `getCollection()`. Use them as templates for product catalogs, team pages, etc. See the [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/).

## Deploying

Cosmo builds to fully static HTML in `./dist/` and runs on any static host. The bundled deployment guide ([src/content/docs/deploying.mdx](src/content/docs/deploying.mdx)) covers the four most common targets. The shared build settings:

- **Install:** `pnpm install --frozen-lockfile`
- **Build:** `pnpm build`
- **Output:** `dist`
- **Node:** `22 LTS`

Quick pointers per host:

- **Cloudflare Pages** — connect the Git repo, pick the **Astro** framework preset, and add `NODE_VERSION=22` to the build environment.
- **GitHub Pages** — set **Settings → Pages → Source** to **GitHub Actions** and add the deploy workflow from the [deploying guide](src/content/docs/deploying.mdx). If you're publishing to a project page (`username.github.io/repo`), also set `base: "/repo"` in `astro.config.mjs`.
- **Netlify** — import the repo and accept the defaults; Netlify auto-detects pnpm from `pnpm-lock.yaml`. Set `NODE_VERSION=22` under build environment.
- **Vercel** — import the repo; the **Astro** preset is auto-detected and pnpm is picked up automatically. Confirm Node 22 under project settings.

See [src/content/docs/deploying.mdx](src/content/docs/deploying.mdx) for the full step-by-step including a ready-to-paste GitHub Actions workflow and a `netlify.toml`.

## Tooling notes

- **Biome** runs as a git pre-commit hook (auto-fixes staged files via lefthook). Run `pnpm check:fix` locally if you want to format ahead of committing.
- **Typecheck** runs on pre-push — `astro check`, which type-checks `.astro` templates in addition to `.ts`.
