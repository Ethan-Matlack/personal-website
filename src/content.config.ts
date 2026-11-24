import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(['business', 'project']),
      summary: z.string().max(200), // used on cards + meta description
      status: z.enum(['active', 'planned', 'archived']).default('active'),
      role: z.string().optional(), // e.g. "Owner & Master Electrician"
      tags: z.array(z.string()).default([]), // tech/skills, shown as chips
      started: z.coerce.date().optional(),
      ended: z.coerce.date().optional(),
      links: z
        .object({
          site: z.url().optional(),
          repo: z.url().optional(),
        })
        .default({}),
      cover: image().optional(),
      coverAlt: z.string().optional(), // required in practice when `cover` is set
      featured: z.boolean().default(false), // shown on home page
      order: z.number().default(100), // lower = earlier
      draft: z.boolean().default(false), // excluded from production build
    }),
});

export const collections = { projects };
