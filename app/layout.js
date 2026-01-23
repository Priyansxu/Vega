import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  metadataBase: new URL('https://seronai.vercel.app/'),

  title: {
    default: 'Seron AI',
    template: '%s | Seron AI',
  },

  description: 'A multi-model AI platform for fast, high-quality image generation.',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: '',
  },

  openGraph: {
    title: 'Seron AI',
    description: 'A multi-model AI platform for fast, high-quality image generation.',
    url: 'https://seronai.vercel.app/',
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