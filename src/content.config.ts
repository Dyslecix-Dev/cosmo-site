import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().optional(),
    updatedDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
