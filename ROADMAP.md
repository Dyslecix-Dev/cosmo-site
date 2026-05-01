# Cosmo roadmap — guides and recipes

Internal planning doc for what to build next. Lives at the repo root because it applies to the meta-repo, not the template. A trimmed public version is published separately at `cosmo.dyslecix.dev/roadmap`; sync manually on major updates rather than trying to keep them identical.

The phases below are coupled: **guides drive recipes**. We don't write a recipe until a guide pulls it in (or someone files an issue, or we reach for it in a real project). Anything else is spec writing for an imaginary reader.

---

## Phase 2.5 — Template: multi-PM support (in flight)

Before Phase 3 guides start scaffolding new repos, the upstream `cosmo` template is being updated to support **npm**, **yarn**, and **pnpm** equally. pnpm stays the first-line default in cosmo-site and template docs; npm and yarn are shown as alternatives so we don't turn users away.

**Implications for guides and recipes:**
- Scaffolding commands in guides use `pnpm create astro@latest -- --template DyslecixDev/cosmo/template` as the default, with `npm create astro@latest …` / `yarn create astro …` shown alongside.
- Same pattern for `pnpm astro add <name>` install steps.
- Lockfile policy and CI examples in `template/` need to either stay pnpm-default or document the three options. Decide once in the template repo, not per-guide.
- This is a **template-level capability**, not a recipe. The "Package-manager comparisons" line under Out of scope below still holds.

Doc sweep on cosmo-site (`src/content/docs/getting-started.md`, `deploying.mdx`, `README.md`) waits until the template change has shipped — premature rewrites would describe capabilities that don't exist yet.

---

## Phase 3 — Use-case guides

**Goal.** A self-contained guide on cosmo.dyslecix.dev for each use case:
*"Here's how to turn cosmo into X."*

**Output per guide.**
- A new public repo, scaffolded from cosmo (not forked, not copy-pasted).
- A deployed live demo, linked from the guide *and* from a centralized
  "Examples" page on cosmo.dyslecix.dev.
- A guide whose spine is the **diff against cosmo** — files added, modified,
  deleted. Concrete and unambiguous.
- A "Recipes used" section linking to the recipe pages the guide pulled in
  (empty/coming-soon pages are fine on first publish).

**Naming convention.** `cosmo-<usecase>` — `cosmo-blog`, `cosmo-portfolio`,
`cosmo-storefront`. Pin this before creating the first one; renaming later
breaks links.

### Order

1. [x] **Docs site + landing page** — already shipped as cosmo.dyslecix.dev
   ([DyslecixDev/cosmo-site](https://github.com/DyslecixDev/cosmo-site)).
   A short **"Built with cosmo"** writeup is queued (the cheapest guide we'll
   write — the artifact already exists; spine is the `git diff` between
   `cosmo/template` and `cosmo-site`). Include a "cosmo vs Starlight" callout
   (cosmo for lighter docs sites alongside marketing pages; Starlight for
   heavy docs portals with versioning/deep nav/built-in search/i18n).

2. [ ] **Blog** — *philosophy blog as the real example.* Lowest activation
   energy: cosmo already ships the collection, layout, tags, RSS, pagination.
   Guide is mostly documenting what's there + recipes the blog needs.
   **Blocking recipes:** Cusdis (comments), Expressive Code (code blocks),
   Motion. Pagefind only if post count crosses ~30.
   Pre-launch: pick the first 3 essays before scaffolding so the example isn't
   another lorem-ipsum site.

3. [ ] **Portfolio** — personal web-dev portfolio. Structurally "blog with
   images + projects collection," so most blog learnings port over. Spine of
   the guide is the **image strategy**: `astro:assets` for local case-study
   screenshots, **Unpic** for any remote/CDN images. Decide before building.
   **Blocking recipes:** Unpic, Motion, Astro Icon.

4. [ ] **Faux e-commerce storefront** — Tier 1 and Tier 2 only (see scope below).
   **Blocking recipes:** Stripe Payment Links, Lemon Squeezy (Tier 1);
   Snipcart (Tier 2).

### Per-guide checklist

- [ ] Decide the realistic example (real content for blog/portfolio; plausible
      product set for storefront).
- [ ] Scaffold a new repo from cosmo via
      `pnpm create astro@latest -- --template DyslecixDev/cosmo/template`
      (or `npm create astro@latest …` / `yarn create astro …`).
- [ ] Build end-to-end. Delete cosmo's seed entries (`template/src/content/blog/*`)
      first — replace with real content.
- [ ] Capture the diff against cosmo as the spine of the writeup.
- [ ] Publish the guide on cosmo.dyslecix.dev with: overview, diff, recipes-used
      links, live demo URL, source repo URL.
- [ ] Deploy the example site. Add to the centralized **Examples** page on
      cosmo.dyslecix.dev *and* link inline from the guide.
- [ ] Open issues / write recipes for any recipe pages still empty after the
      guide ships.

### Storefront scope (decide once, here)

- **Tier 1 — hosted checkout, single product per click.** Products as a content
  collection with frontmatter (name, price, sku, image, checkout link). Buy
  button links to a pre-created **Stripe Payment Link** or **Lemon Squeezy**
  hosted checkout URL. Zero JS state. Covers digital goods, single-SKU physical
  goods, donations, indie-maker stores. **Start here.**
- **Tier 2 — client-side cart via aggregator.** **Snipcart** or **Shopify Buy
  SDK / Storefront API**. Cart UI + line-item aggregation + checkout handled
  by their backend. Still no server in the repo.
- **Tier 3 — out of scope.** Multi-line-item Stripe Checkout requires a server
  endpoint to sign Sessions. That means an Astro adapter, which means leaving
  `output: "static"`. The guide should end Tier 2 with an honest off-ramp:
  *"If you need this, you've outgrown a static site — add an adapter and see
  Astro's SSR docs."*

Pick a faux-product set that fits Tier 1/2 (digital goods, prints, donations).
Avoid anything that wants real inventory or shipping rules — you'll fight the
architecture and muddy the guide.

---

## Phase 4 — Recipes, on demand

**Goal.** Short copy-paste guides on cosmo.dyslecix.dev for optional
integrations.

**The rule.** Don't write a recipe until at least one of these is true:
- A Phase 3 guide references it.
- You personally reach for it in a real project.
- A user asks for it in a GitHub issue (see `.github/ISSUE_TEMPLATE/recipe-request.yml`).

### Recipe blocker convention

Recipes that a Phase 3 guide explicitly pulls in are tagged **🔒 Blocks: \<guide\>**
in the candidate list below. Those are the only recipes scheduled to be written
proactively — everything else waits for demand. When you sit down to start a
guide, filter the list by its tag to see the dependency chain.

### Per-recipe checklist

- [ ] Install the dependency in a real scaffolded project.
- [ ] Configure end-to-end and verify it works.
- [ ] Write up: deps, config, minimal example, gotchas. Keep it short.
- [ ] Link the recipe from any guide that needs it.

### Native Astro features (link-only, not recipes)

If Astro documents it natively, we link to Astro's docs rather than writing a
recipe. A short list lives in [README.md](README.md) and
[template/README.md](template/README.md). Per-feature pages on cosmo.dyslecix.dev
exist **only** where there's cosmo-specific glue worth showing.

| Feature | Glue page? | Notes |
| --- | --- | --- |
| i18n routing | Yes | `BaseLayout` updates for `lang` / `hreflang`, plus the cosmo nav. |
| View Transitions (`@view-transition`) | Link only | Template doesn't ship a JS router; users opt in via the CSS API or re-add `ClientRouter` themselves. |
| `astro:assets` (images) | Link only | Native, no glue. |
| `astro:assets` Font component | Link only | Already wired in `BaseLayout`. |
| Content collections | Link only | `content.config.ts` already demonstrates the pattern. |
| Markdown / MDX | Link only | Built-in + `@astrojs/mdx`. |
| Sitemap | Link only | Official integration, already wired. |
| RSS | Yes | Already wired in `rss.xml.js`; downstream users adapt for non-blog collections. |
| Prefetch | Link only | Already on. |
| Env vars (`astro:env`) | Link only | Native. |
| Middleware | Link only | Limited use on static, but valid for redirects/headers via adapters. |
| Dev toolbar | Link only | Native. |

### Recipe candidates

Organized by category. **Bold** = primary pick. Alternatives listed after.
**🔒 Blocks** = recipe must ship before the named Phase 3 guide can land complete.

**Framework integrations** *(one recipe, not six)*
- [ ] **Adding interactive islands** — single recipe covering Alpine.js, Preact,
      React, SolidJS, Svelte, Vue. Setup is identical (`pnpm astro add <name>`,
      or the npm/yarn equivalent); what users actually need is the islands
      pattern + a one-paragraph guide on which framework to pick. Link to
      Astro's per-framework docs.

**UI**
- [ ] **Starwind UI** (Astro-native component library)
- [ ] **Astro Icon** + **Lucide** — 🔒 Blocks: portfolio
- [ ] **Motion** (animation; alts: **GSAP**, **Auto-Animate**) — 🔒 Blocks: blog, portfolio
- [ ] **Astro OG Canvas** (OG image generation; alts: **Satori**, **@vercel/og**)

**Code blocks & diagrams**
- [ ] **Expressive Code** — 🔒 Blocks: blog. (De facto standard in the Astro
      ecosystem; Starlight uses it.) Alternative: **Shiki** (already bundled in
      Astro; recipe would cover themes/transformers).
- [ ] **Mermaid** (one recipe; covers most asks).

**Content / CMS**
- [ ] **Keystatic** (git-based, locally editable)
- [ ] **Sanity**
- [ ] **Decap CMS** (free, git-based; what Netlify CMS became)
- [ ] **Tina**
- [ ] **Storyblok** (visual)
- [ ] **Astro Embed** (rich embeds for tweets, YouTube, etc.)

**Search**
- [ ] **Pagefind** (static, build-time indexed; the canonical static-site search;
      possible blocker for blog if post count crosses ~30).
      Alts: **Orama** (richer querying), **Algolia DocSearch** (free for OSS docs).

**State**
- [ ] **Nano Stores** (Astro's recommended cross-island state).

**Comments** *(blogs)*
- [ ] **Cusdis** — 🔒 Blocks: blog. (Lightweight, no GitHub account required,
      optional self-host.)
- [ ] **Disqus** (most recognizable for non-tech users; call out the heavy
      bundle and tracking tradeoffs).
- [ ] **Remark42** (self-hosted, supports anonymous + OAuth).
- [ ] **Webmentions** via webmention.io + Bridgy (IndieWeb pattern; replies
      happen on Mastodon/Bluesky/etc and federate back).

The blog guide should also note that **many modern blogs ship without
comments** and link to email/social/Mastodon instead — so non-tech bloggers
don't feel like they're missing something.

**Forms**
- [ ] **Formspree**, **Web3Forms**, **Netlify Forms** (one recipe comparing the
      three).

**Email**
- [ ] **Resend** (transactional)
- [ ] **Buttondown** (newsletter; alts: **Kit (ex-ConvertKit)**, **Mailchimp**)

**Payments**
- [ ] **Stripe Payment Links** — 🔒 Blocks: storefront (Tier 1)
- [ ] **Lemon Squeezy** — 🔒 Blocks: storefront (Tier 1)
- [ ] **Ko-fi** (Tier 1)
- [ ] **Snipcart** — 🔒 Blocks: storefront (Tier 2 — client-side cart aggregator)
- [ ] **Shopify Buy SDK / Storefront API** (Tier 2)

**Images**
- [ ] **Unpic** — 🔒 Blocks: portfolio. (Remote images, where `astro:assets` falls short.)
- [ ] **Cloudinary** (transforms-at-scale)

**Performance**
- [ ] **Partytown** (third-party script offloading; official Astro integration)
- [ ] **vite-pwa** (PWA)
- [ ] **Sonda** (bundle analysis)

**Testing**
- [ ] **Vitest**
- [ ] **Testing Library**
- [ ] **Playwright** (alt: **Cypress**)

**Deployment**
- [ ] **Cloudflare Pages**, **GitHub Pages**, **Netlify**, **Vercel** (one recipe each).

**Analytics**
- [ ] **Plausible**, **Fathom**, **Umami**, **PostHog**, **GA4** (one recipe
      comparing the privacy-first options + GA4 for completeness).

**Monitoring**
- [ ] **Sentry**

**Accessibility & SEO tooling**
- [ ] **Lighthouse**, **Pa11y**, **axe**, **WAVE** (CI-friendly + browser-based)
- [ ] **Google Search Console**, **Bing Webmaster Tools**

---

## Explicitly out of scope

Listed here so they don't drift back in via "completeness" instincts.

- **Auth** (Clerk, Auth.js, Auth Astro) — none of cosmo's target use cases
  (blog, docs, landing, storefront, portfolio, newsletter, marketing) need user
  accounts. Storefronts lean on Stripe Checkout / Customer Portal for any
  logged-in flow.
- **Tier 3 storefront** (custom multi-line-item Stripe Checkout) — requires a
  server endpoint, which leaves static.
- **Astro Font** — superseded by the native `astro:assets` Font component.
- **swup** — the template doesn't ship a client-side router; users who want one should use Astro's `ClientRouter` directly.
- **astro-compressor / Compress / astro-robots-txt** — most hosts handle
  compression; cosmo's existing `public/robots.txt` covers 95% of robot needs.
- **Astro Auto Import, Astro Remote, astro-portabletext** — niche; revisit only
  if a specific guide pulls them in.
- **astrolib, InoxTools, orbit, Bag of Tricks** — collections of utilities, not
  single recipes. Mine for individual ideas if a real use case hits.
- **Data & storage** — no DB, no ORM. cosmo is static-site only.
- **Package-manager comparisons (pnpm/npm/yarn/Bun) as a recipe** — multi-PM
  support is now a template-level capability (see Phase 2.5). The README
  paragraph documents the choice; it does not warrant a standalone recipe.

---

## Open questions

- [ ] When the blog guide ships, does the "Why no recipe for X?" page on
      cosmo.dyslecix.dev land at the same time? It pre-empts frustration and
      points users at the issue template.

---

## Decision log

- **2026-04-27** — Public roadmap: ship it. Demand-signal argument wins.
  Public version lives at `cosmo.dyslecix.dev/roadmap`; this internal file
  stays at the repo root and is the source of truth.
- **2026-04-27** — Multi-PM support added to the template as Phase 2.5.
  pnpm stays default in cosmo-site and template docs; npm/yarn shown as
  alternatives. cosmo-site itself remains pnpm-only (deployed site, not a
  template).
- **2026-04-27** — "Built with cosmo" writeup queued under Phase 3 step 1
  rather than waiting for a user request. The artifact already exists; cost
  is ~1 afternoon and it doubles as proof the dogfooding works.
- **2026-04-30** — Backported small improvements from cosmo-site to
  `template-{pnpm,npm,yarn}`: dropped `ClientRouter` (Safari compatibility),
  externalized theme bootstrap to `public/theme.js`, added `subsets: ["latin"]`
  to both Font entries, bumped skip-link to `z-60`, added an `ogType` prop to
  `SEO.astro`, added a sitemap `filter` excluding `/404`, and added a `ci.yml`
  workflow (typecheck + build).
