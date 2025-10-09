import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.refrigairsystemes.fr'
  const now = new Date().toISOString()
  const urls = [
    '',
    '/expertises',
    '/maintenances-services',
    '/qualites-certification',
    '/contact',
  ]
  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}


