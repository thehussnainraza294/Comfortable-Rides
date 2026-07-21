import { site } from '../lib/config';

// Required with output: 'export', otherwise Next.js treats this as a
// server route and the build fails.
export const dynamic = 'force-static';

// Generates sitemap.xml at build time. The admin page is deliberately
// left out, since it is a login screen and has no place in search results.
export default function sitemap() {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}