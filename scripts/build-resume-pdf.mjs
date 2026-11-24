// Build the site, serve it with `astro preview`, and print /resume/ to a Letter PDF.
// Run locally (`npm run resume:pdf`) and commit the output. CI never needs Chromium.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const yamlPath = `${root}src/data/resume.yaml`;
const pdfPath = `${root}public/ethan-matlack-resume.pdf`;
const hashPath = `${pdfPath}.sha256`;
const PDF_TITLE = 'Ethan Matlack — Resume';

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

const run = (cmd, args, opts = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, stdio: 'inherit', ...opts });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`)),
    );
  });

async function waitFor(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

let preview;
let browser;
let exitCode = 0;
try {
  // `astro build` directly: the prebuild freshness check would (correctly) fail here.
  await run('npx', ['astro', 'build']);

  const port = await freePort();
  preview = spawn(
    'npx',
    ['astro', 'preview', '--ignore-lock', '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'inherit'],
      detached: true,
    },
  );
  const url = `http://127.0.0.1:${port}/resume/`;
  await waitFor(url);

  browser = await chromium.launch();
  const page = await browser.newPage({ colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.evaluate(async (title) => {
    document.title = title; // becomes the PDF's metadata Title
    await document.fonts.ready;
  }, PDF_TITLE);

  const pdf = await page.pdf({
    format: 'Letter',
    printBackground: false,
    preferCSSPageSize: true,
    tagged: true,
    outline: false,
  });
  await writeFile(pdfPath, pdf);

  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  const hash = createHash('sha256')
    .update(await readFile(yamlPath))
    .digest('hex');
  await writeFile(hashPath, `${hash}\n`);

  console.log(`\n✓ Wrote public/ethan-matlack-resume.pdf (${pages} page${pages === 1 ? '' : 's'})`);
  if (pages > 2) console.warn('⚠ The resume is longer than 2 pages. Tighten the content.');
} catch (err) {
  console.error(`\n✖ Resume PDF build failed: ${err instanceof Error ? err.message : err}`);
  exitCode = 1;
} finally {
  await browser?.close();
  if (preview?.pid) {
    try {
      process.kill(-preview.pid, 'SIGTERM'); // kill the whole process group (npx → astro)
    } catch {
      /* already gone */
    }
  }
}
process.exit(exitCode);
