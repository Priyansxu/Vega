export const dynamic = 'force-static'

export default function sitemap() {
  const lastModified = new Date()

  return [
    {
      url: 'https://vega.js.org',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://vega.js.org/create',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}