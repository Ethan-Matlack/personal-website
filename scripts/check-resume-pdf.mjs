// prebuild: fail if resume.yaml changed since the committed PDF was generated.
// Bypass in an emergency with SKIP_RESUME_CHECK=1.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const yamlPath = fileURLToPath(new URL('src/data/resume.yaml', root));
const hashPath = fileURLToPath(new URL('public/ethan-matlack-resume.pdf.sha256', root));
const pdfPath = fileURLToPath(new URL('public/ethan-matlack-resume.pdf', root));

if (process.env.SKIP_RESUME_CHECK === '1') {
  console.warn('⚠ SKIP_RESUME_CHECK=1: skipping the resume PDF freshness check.');
  process.exit(0);
}

const fail = (msg) => {
  console.error(`\n✖ ${msg}\n  Run \`npm run resume:pdf\` and commit the PDF.\n`);
  process.exit(1);
};

const current = createHash('sha256')
  .update(await readFile(yamlPath))
  .digest('hex');

let committed;
try {
  committed = (await readFile(hashPath, 'utf8')).trim();
  await readFile(pdfPath);
} catch {
  fail('Resume PDF or its hash file is missing.');
}

if (committed !== current) fail('Resume data changed.');

console.log('✓ Resume PDF is up to date with resume.yaml.');
