export default function manifest() {
  return {
    name: 'Seron AI - Multi-Model Image Generation',
    short_name: 'Seron AI',
    description: 'A multi-model AI platform for fast, high-quality image generation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}