import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { hash } from "node:crypto";

// Astro Website Collections (not to do with SQL)

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    datetime: z.coerce.date(),
    hashtags: z.array(z.string()).optional().default([]),
  }),
});

const music = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/music" }),
    schema: z.object({
      title: z.string(),
      artist: z.string(),
      date: z.coerce.date(),
      type: z.string(),
      url: z.string()
    })

})

const blogs = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blogs" }),
    schema: z.object({
      title: z.string(),
      datetime: z.coerce.date(),
      hashtags: z.array(z.string()).optional().default([]),
    })

})

export const collections = { notes, music, blogs };
