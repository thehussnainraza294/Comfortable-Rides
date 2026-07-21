import { site } from '../lib/config';

// Required with output: 'export', otherwise Next.js treats this as a
// server route and the build fails.
export const dynamic = 'force-static';

// Generates robots.txt at build time.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}