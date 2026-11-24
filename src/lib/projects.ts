import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

const KIND_ORDER = { business: 0, project: 1 } as const;

/** Published projects: drafts excluded in production; businesses first, then by `order`. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return all.sort(
    (a, b) =>
      KIND_ORDER[a.data.kind] - KIND_ORDER[b.data.kind] ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

const monthFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(d: Date): string {
  return monthFmt.format(d);
}

export function isoMonth(d: Date): string {
  return d.toISOString().slice(0, 7);
}
