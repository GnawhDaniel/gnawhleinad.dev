import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    datetime: z.coerce.date(),
    hashtags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { notes };
