---
title: Wiring RSS
description: Hook the RSS feed up to a content collection.
order: 4
updatedDate: 2026-04-26
---

Cosmo ships with a stub RSS endpoint at `src/pages/rss.xml.js`. Until you wire it to a collection, the feed renders with zero items.

## Wire to the blog collection

It includes a `blog` collection you can wire the feed to.

Replace the stub with a `getCollection` call that filters drafts and sorts by `pubDate`:

```js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: "Your Site",
    description: "A new site built with Cosmo.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
```

## Discoverability

Add an autodiscovery `<link>` in `src/layouts/BaseLayout.astro`:

```astro
<link rel="alternate" type="application/rss+xml" title="Your Site" href="/rss.xml" />
```

The feed lives at `/rss.xml`. The `site` field in `astro.config.mjs` must be set for absolute URLs to resolve correctly.
