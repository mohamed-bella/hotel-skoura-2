import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bassatineskoura.com'
  
  // Define the main routes of your site
  const routes = [
    '',
    '/rooms',
    '/rooms/royal-suite',
    '/rooms/garden-suite',
    '/rooms/palm-suite',
    '/rooms/desert-view-suite',
  ]
  
  // Map the routes to the sitemap format
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'monthly' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
} 