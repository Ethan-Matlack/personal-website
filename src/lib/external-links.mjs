// Markdown: open external links (http/https to another host) in a new tab.
// Adds rel="noopener" and screen-reader text, matching the links on project pages.
// A Sätteri HTML-tree plugin (Astro's default Markdown processor); no extra dependencies.
export default function externalLinks({ siteHost } = {}) {
  const isExternal = (href) => {
    if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return false;
    try {
      return new URL(href).hostname.replace(/^www\./, '') !== siteHost;
    } catch {
      return false;
    }
  };
  return {
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!isExternal(node.properties?.href)) return;
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['noopener']);
        ctx.appendChild(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['visually-hidden'] },
          children: [{ type: 'text', value: ' (opens in a new tab)' }],
        });
      },
    },
  };
}
