---

## Phase 1 — Build `cosmo-site` (the new repo)

Repo: `Dyslecix-Dev/cosmo-site`. Domain: `cosmo.dyslecix.dev`. Host: Cloudflare Pages.

- [x] Scaffold with `pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template cosmo-site` (dogfood).
- [x] Strip the seed `blog` collection — `cosmo-site` doesn't need it. Touches: [src/content.config.ts](src/content.config.ts), [src/content/blog/](src/content/blog/), [src/pages/blog/](src/pages/blog/), [src/components/blog/](src/components/blog/), [src/layouts/BlogPost.astro](src/layouts/BlogPost.astro), [src/lib/related-entries.ts](src/lib/related-entries.ts) (blog-only), and any Navbar links. Also **delete [src/pages/rss.xml.js](src/pages/rss.xml.js)** — a docs site doesn't need a feed for now.
- [ ] The six guides are already scaffolded into [src/content/docs/](src/content/docs/) from the template, so this is a **link-fixup pass**, not a move:
  - `getting-started.md`
  - `rebranding-via-tokens.mdx`
  - `adding-a-content-collection.mdx`
  - `wiring-rss.md`
  - `seo-checklist.mdx`
  - `deploying.mdx`
- [ ] Update each guide's internal links — they reference `template/...` paths that exist in the upstream `cosmo` repo but **not** in this repo, so they will 404 as written. Rewrite them as **absolute GitHub URLs** against the upstream template: `https://github.com/Dyslecix-Dev/cosmo/blob/main/template/...`.
- [ ] Assign a sensible reading order via the `order` frontmatter field on each doc:
  1. `getting-started`
  2. `rebranding-via-tokens`
  3. `adding-a-content-collection`
  4. `wiring-rss`
  5. `seo-checklist`
  6. `deploying`
- [ ] **Add a new "minimum viable collection" recipe** to the docs collection — a domain-agnostic walkthrough of schema + index + detail using placeholder names (`<your-collection>`), with no specific example domain. This stays the foundation that future per-use-case docs (blog, landing page, e-commerce, docs, etc.) will build on. Reference `cosmo`'s `blog` as a fuller showcase.
- [ ] Build the site shell:
  - Landing page — hero with the `pnpm create astro` one-liner (copy button), 3-4 feature bullets, CTAs to docs + GitHub.
  - Docs section — index + detail pages for the migrated guides.
  - Privacy policy page — see Phase 1.5 for content.
  - Footer with social links.
  - GitHub stars badge (shields.io in the hero is plenty; a banner is overkill).
- [ ] Add **"Edit this page on GitHub"** link to docs detail pages, pointing at `https://github.com/Dyslecix-Dev/cosmo-site/edit/main/src/content/docs/{slug}.{ext}`.
- [ ] Drop in OG image (already prepared).
- [ ] Wire **Cloudflare Web Analytics** (cookieless, no banner needed).
- [ ] Wire **Cloudflare Observatory** (cookieless RUM, no banner needed).
- [ ] Wire **Sentry** via `@sentry/astro`:
  - Errors-only — **do not enable session replay** (would force a cookie consent banner and expand the privacy policy).
  - Add `SENTRY_AUTH_TOKEN` to Cloudflare Pages build env and configure source-map upload at build time, otherwise stack traces stay minified.
  - **Release tagging** — pass a release identifier to *both* the Vite plugin (for source-map artifact tagging) *and* the runtime SDK init. Without matching releases on both sides, uploaded source maps won't associate with errors and stack traces will still come through minified. Use `CF_PAGES_COMMIT_SHA` (provided by Cloudflare Pages at build time) as `SENTRY_RELEASE`.
  - **Gate init to production only** — `if (import.meta.env.PROD) Sentry.init(...)`. Otherwise every Cloudflare Pages preview deploy dumps errors into prod Sentry.
- [ ] Deploy to Cloudflare Pages, attach `cosmo.dyslecix.dev` (after Phase 3 frees the domain).

### Phase 1.5 — Privacy policy contents

With this analytics stack the policy is short. Cover:

1. **What's collected** — aggregate pageview/perf data (CF Web Analytics + Observatory, cookieless), and JS errors (Sentry).
2. **What Sentry processes** — IP address, URL, browser/OS, stack trace at time of error. US-based processor (Functional Software Inc.).
3. **No cookies, no tracking, no profiling.**
4. **Contact** — email for data requests.

---