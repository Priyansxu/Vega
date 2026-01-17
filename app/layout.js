import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  metadataBase: new URL('https://vega.js.org'),
  
  title: {
    default: 'Vega AI',
    template: '%s | Vega AI',
  },

  description: 'Vega AI — Fast, creative, and free AI image generation platform.',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: 'pZ1d-eYCjWFhS07_e1SoS8myfd9oLiHbidf1AdR3t38',
  },

  openGraph: {
    title: 'Vega AI',
    description: 'Generate stunning visuals instantly with Vega AI. No cost. No watermark.',
    url: 'https://vega.js.org',
    siteName: 'Vega AI',
    images: ['/og.png'],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Vega AI',
    description: 'Create high-quality AI-generated images instantly with Vega AI.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head />
      <body className="bg-black text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}