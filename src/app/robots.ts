import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/immo/admin/', '/immo/dashboard/', '/*?city=*', '/*?sort=*'],
    },
    sitemap: 'https://avispromoteur.com/sitemap.xml',
  }
}
