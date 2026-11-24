// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  // Self-hosted variable fonts from the installed Fontsource packages.
  // Astro generates size-adjusted fallbacks so font swap causes no layout shift.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-sans',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
