import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * NOTE: example content collections. Delete or adapt for your use case:
 *  - blog:     chronological posts with tags + hero images
 *  - docs:     evergreen guides with sibling ordering
 *
 * See https://docs.astro.build/en/guides/content-collections/
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { docs, blog };
