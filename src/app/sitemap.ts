import { MetadataRoute } from 'next'
import { MOCK_DEVELOPERS, MOCK_PROJECTS } from '@/data/immoMock'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://avispromoteur.com'
  
  const devUrls = MOCK_DEVELOPERS.map((dev) => ({
    url: `/immo/developers/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const projUrls = MOCK_PROJECTS.map((proj) => ({
    url: `/immo/projects/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `/immo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `/immo/developers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `/immo/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...devUrls,
    ...projUrls,
  ]
}
