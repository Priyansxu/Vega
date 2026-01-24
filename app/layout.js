import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://seron.is-a.software'),

  title: {
    default: 'Seron AI',
    template: '%s | Seron AI',
  },

  description: 'A multi-model AI platform for fast, high-quality image generation.',

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
    title: 'Seron AI',
    description: 'A multi-model AI platform for fast, high-quality image generation.',
    url: 'https://seron.is-a.software',
    siteName: 'Seron AI',
    images: ['/og.png'],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Seron AI',
    description: 'A multi-model AI platform for fast, high-quality image generation.',
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
