import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Block all crawlers — this is an SIH2026 prototype, not intended for public indexing
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
