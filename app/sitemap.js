export const dynamic = 'force-static'

export default function sitemap() {
  const lastModified = new Date()

  return [
    {
      url: 'https://seronai.vercel.app',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://seronai.vercel.app/create',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
