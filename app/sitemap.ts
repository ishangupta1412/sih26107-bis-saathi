import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bis-saathi-nine.vercel.app';
  const routes = [
    '',
    '/standards',
    '/pathway',
    '/checker',
    '/offices',
    '/complaint',
    '/chat',
    '/about',
    '/policies',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
