import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md' /* files starting with _ (e.g. _template.md) are ignored */,
    base: './src/content/projects',
  }),
  // Field order matches the project page, top to bottom and left to right; non-displayed fields last.
  // Strict: an unknown or misspelled field fails the build instead of being silently ignored.
  schema: ({ image }) =>
    z.strictObject({
      kind: z.enum(['business', 'project']), // label above the title
      title: z.string(),
      summary: z.string().max(200), // subtitle; also cards + meta description
      role: z.string().optional(), // e.g. "Owner & Master Electrician"
      started: z.coerce.date().optional(), // YYYY-MM
      ended: z.coerce.date().optional(), // YYYY-MM; omit = Present
      status: z.enum(['active', 'planned', 'completed', 'archived']).default('active'),
      links: z
        .strictObject({
          site: z.url().optional(),
          repo: z.url().optional(),
          paper: z.url().optional(), // e.g. a report hosted by a university library
        })
        .nullish() // an empty `links:` (all children commented out) means no links
        .transform((v) => v ?? {}),
      tags: z.array(z.string()).default([]), // chips; first 4 shown on cards
      cover: image().optional(),
      coverAlt: z.string().optional(), // required in practice when `cover` is set
      featured: z.boolean().default(false), // shown on home page
      order: z.number().default(100), // lower = earlier
      draft: z.boolean().default(false), // excluded from production build
    }),
});

export const collections = { projects };
