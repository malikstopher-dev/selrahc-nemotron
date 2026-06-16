import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://selrahcarchitects.com'),
  title: 'Selrahc Architects | Contemporary Architecture',
  description: 'Award-winning contemporary architecture practice creating spaces that inspire, endure, and transform. Residential, commercial, and interior architecture.',
  keywords: ['architecture', 'contemporary architecture', 'architect', 'design', 'South Africa', 'residential architecture', 'interior design'],
  openGraph: {
    title: 'Selrahc Architects | Contemporary Architecture',
    description: 'Award-winning contemporary architecture practice creating spaces that inspire, endure, and transform.',
    type: 'website',
    locale: 'en_ZA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[#0a0a0a]">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
