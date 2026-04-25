import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

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
