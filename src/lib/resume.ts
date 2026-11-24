import { z } from 'astro/zod';
import { parse } from 'yaml';
import raw from '../data/resume.yaml?raw';
import { site } from '../data/site';

/**
 * A month value: `YYYY-MM`, `YYYY`, or a `TODO…` placeholder.
 * YAML may hand us a Date or number for unquoted values, so normalize to string first.
 */
const monthValue = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 7) : typeof v === 'number' ? String(v) : v),
  z
    .string()
    .regex(/^(\d{4}(-(0[1-9]|1[0-2]))?|TODO.*)$/, 'Use YYYY-MM, YYYY, or a TODO placeholder'),
);

const resumeSchema = z.strictObject({
  basics: z.strictObject({
    name: z.string().optional(),
    headline: z.string(),
    summary: z.string(),
  }),
  highlights: z.array(z.string()).default([]),
  experience: z.array(
    z.strictObject({
      org: z.string(),
      role: z.string(),
      location: z.string().optional(),
      start: monthValue,
      end: monthValue.nullable(), // null = Present
      bullets: z.array(z.string()).min(1),
    }),
  ),
  education: z.array(
    z.strictObject({
      school: z.string(),
      degree: z.string(),
      focus: z.string().optional(),
      year: z.union([z.number().int(), z.string()]).optional(),
    }),
  ),
  licenses: z.array(
    z.strictObject({
      name: z.string(),
      issuer: z.string(),
      year: z.number().int().optional(),
    }),
  ),
  certifications: z.array(z.string()),
  skills: z.array(
    z.strictObject({
      group: z.string(),
      items: z.array(z.string()).min(1),
    }),
  ),
});

export type Resume = z.infer<typeof resumeSchema>;

const result = resumeSchema.safeParse(parse(raw));
if (!result.success) {
  throw new Error(`src/data/resume.yaml failed validation:\n${z.prettifyError(result.error)}`);
}

export const resume: Resume & { basics: { name: string } } = {
  ...result.data,
  basics: { ...result.data.basics, name: result.data.basics.name ?? site.name },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2020-01" → "Jan 2020"; "2020" → "2020"; placeholders pass through. */
export function formatMonth(value: string): string {
  const m = /^(\d{4})(?:-(\d{2}))?$/.exec(value);
  if (!m) return value;
  return m[2] ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : m[1];
}

/** Valid `datetime` attribute, or undefined for placeholders. */
export function datetimeAttr(value: string): string | undefined {
  return /^\d{4}(-\d{2})?$/.test(value) ? value : undefined;
}
