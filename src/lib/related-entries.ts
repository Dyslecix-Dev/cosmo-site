import type { CollectionEntry } from "astro:content";

export function relatedEntries(current: CollectionEntry<"blog">, all: CollectionEntry<"blog">[], limit = 3): CollectionEntry<"blog">[] {
  const currentTags = new Set(current.data.tags ?? []);
  if (currentTags.size === 0) return [];

  return all
    .filter((entry) => entry.id !== current.id)
    .map((entry) => {
      const overlap = (entry.data.tags ?? []).filter((tag) => currentTags.has(tag)).length;
      return { entry, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf();
    })
    .slice(0, limit)
    .map(({ entry }) => entry);
}
