---

## Phase 1 — Build `cosmo-site` (the new repo)

Repo: `Dyslecix-Dev/cosmo-site`. Domain: `cosmo.dyslecix.dev`. Host: Cloudflare Pages.

- [x] Scaffold with `pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template cosmo-site` (dogfood).
- [x] Strip the seed `blog` collection — `cosmo-site` doesn't need it. Touches: [src/content.config.ts](src/content.config.ts), [src/content/blog/](src/content/blog/), [src/pages/blog/](src/pages/blog/), [src/components/blog/](src/components/blog/), [src/layouts/BlogPost.astro](src/layouts/BlogPost.astro), [src/lib/related-entries.ts](src/lib/related-entries.ts) (blog-only), and any Navbar links. Also **delete [src/pages/rss.xml.js](src/pages/rss.xml.js)** — a docs site doesn't need a feed for now.
- [x] The six guides are already scaffolded into [src/content/docs/](src/content/docs/) from the template, so this is a **link-fixup pass**, not a move:
  - `getting-started.md`
  - `rebranding-via-tokens.mdx`
  - `adding-a-content-collection.mdx`
  - `wiring-rss.md`
  - `seo-checklist.mdx`
  - `deploying.mdx`
- [x] Update each guide's internal links — they reference `template/...` paths that exist in the upstream `cosmo` repo but **not** in this repo, so they will 404 as written. Rewrite them as **absolute GitHub URLs** against the upstream template: `https://github.com/Dyslecix-Dev/cosmo/blob/main/template/...`.
- [x] Assign a sensible reading order via the `order` frontmatter field on each doc:
  1. `getting-started`
  2. `rebranding-via-tokens`
  3. `adding-a-content-collection`
  4. `wiring-rss`
  5. `seo-checklist`
  6. `deploying`
- [x] **Add a new "minimum viable collection" recipe** to the docs collection — a domain-agnostic walkthrough of schema + index + detail using placeholder names (`<your-collection>`), with no specific example domain. This stays the foundation that future per-use-case docs (blog, landing page, e-commerce, docs, etc.) will build on. Reference `cosmo`'s `blog` as a fuller showcase.
- [x] Build the site shell:
  - Landing page — hero with the `pnpm create astro` one-liner (copy button), 3-4 feature bullets, CTAs to docs + GitHub.
  - Docs section — index + detail pages for the migrated guides.
  - Privacy policy page — see Phase 1.5 for content.
  - Footer with social links.
  - GitHub stars badge (shields.io in the hero is plenty; a banner is overkill).
- [x] Add **"Edit this page on GitHub"** link to docs detail pages, pointing at `https://github.com/Dyslecix-Dev/cosmo-site/edit/main/src/content/docs/{slug}.{ext}`.
- [x] Drop in OG image (already prepared).
- [ ] Deploy to Cloudflare Pages, attach `cosmo.dyslecix.dev` (after Phase 3 frees the domain).
- [ ] Wire **Cloudflare Web Analytics** (cookieless, no banner needed).
- [ ] Wire **Cloudflare Observatory** (cookieless RUM, no banner needed).

### Phase 1.5 — Privacy policy contents

With this analytics stack the policy is short. Cover:

1. **What's collected** — aggregate pageview/perf data only (CF Web Analytics + Observatory RUM, both cookieless). No error tracking, no session replay.
2. **localStorage** — single `theme` key for light/dark preference; not an identifier.
3. **Subprocessors** — Cloudflare only.
4. **Third-party content** — shields.io GitHub stars badge embedded in the hero (visitor IP/UA exposed to shields.io on image fetch).
5. **No cookies, no tracking, no profiling.**
6. **Rights enumerated** — GDPR/UK GDPR + CCPA/CPRA (incl. "do not sell or share").
7. **Contact** — email for data requests.

---