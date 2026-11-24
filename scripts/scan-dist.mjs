// postbuild: scan dist/ for things that must never be published (spec §9, §12).
import { readdir, readFile } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const TEXT = new Set(['.html', '.xml', '.txt', '.js', '.css', '.json', '.svg', '.webmanifest', '']);

const checks = [
  // US phone numbers: (423) 555-0100, 423-555-0100, 423.555.0100, +1 423 555 0100
  {
    name: 'phone number',
    re: /(?<![\w./-])(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}(?![\w-])/g,
  },
  { name: 'tel: link', re: /\btel:/gi },
  // Any subdomain of ethanmatlack.com (the apex and www are fine)
  { name: 'ethanmatlack.com subdomain', re: /\b(?!www\.)[a-z0-9-]+\.ethanmatlack\.com\b/gi },
  // IPv4 addresses
  {
    name: 'IPv4 address',
    re: /(?<![\d.])(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)(?![\d.])/g,
  },
  // host:port style references (localhost:8080, foo.lan:32400)
  { name: 'host:port', re: /\b(?:localhost|[a-z0-9-]+\.(?:lan|local|home|internal)):\d{2,5}\b/gi },
  // Street addresses: "123 Main St", "45 Oak Avenue"
  {
    name: 'street address',
    re: /\b\d{1,6}\s+(?:[A-Z][a-z]+\s){1,3}(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Ln|Lane|Dr|Drive|Ct|Court|Pike|Hwy|Way)\b\.?/g,
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const hits = [];
for await (const file of walk(dist)) {
  if (!TEXT.has(extname(file))) continue;
  const text = await readFile(file, 'utf8');
  for (const { name, re } of checks) {
    for (const m of text.matchAll(re)) {
      hits.push(`${relative(dist, file)}: ${name}: "${m[0]}"`);
    }
  }
}

if (hits.length) {
  console.error(`\n✖ scan-dist found ${hits.length} item(s) that must not be published:\n`);
  for (const h of hits) console.error(`  ${h}`);
  console.error('');
  process.exit(1);
}
console.log('✓ scan-dist: no phone numbers, addresses, subdomains, IPs, or ports in dist/.');
