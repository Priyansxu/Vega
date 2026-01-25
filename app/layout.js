import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://seron.is-a.software'),

  title: {
    default: 'Seron AI - Flux, Phoenix, SDXL & Stability AI Image Generator',
    template: '%s | Seron AI',
  },

  description: 'Multi-model AI image generation platform featuring Flux 2 Klein, Phoenix 1.0, SDXL, Stability AI, and Leonardo AI. Create stunning AI art with the latest text-to-image models.',

  keywords: [
    'Flux 2 Klein',
    'Flux AI',
    'Phoenix 1.0 AI',
    'SDXL image generation',
    'Stability AI',
    'Leonardo AI',
    'AI image generator',
    'text to image AI',
    'stable diffusion XL',
    'multi-model AI platform',
    'AI art generator',
    'flux image generator',
    'phoenix AI model',
    'AI image creation',
    'generative AI art',
    'AI design tools',
    'free AI image generator',
    'stable diffusion models',
    'AI artwork creator',
    'machine learning images',
    'neural network art',
    'AI image synthesis',
    'diffusion models',
    'creative AI tools',
  ],

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: 'D40g0LS0uV8jAcxoNCxONZGPGFtWn5-OOk3upI9J6Wg',
  },

  openGraph: {
    title: 'Seron AI - Flux, Phoenix, SDXL & Stability AI Image Generator',
    description: 'Multi-model AI image generation platform featuring Flux 2 Klein, Phoenix 1.0, SDXL, Stability AI, and Leonardo AI. Create stunning AI art instantly.',
    url: 'https://seron.is-a.software',
    siteName: 'Seron AI',
    images: ['/og.png'],
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Seron AI - Flux, Phoenix, SDXL & Stability AI',
    description: 'Multi-model AI platform featuring Flux 2 Klein, Phoenix 1.0, SDXL, Stability AI & Leonardo. Generate high-quality AI images instantly.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className="bg-black text-white font-outfit">
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
