import type { Metadata } from 'next';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Selrahc Architects | Award-Winning Architecture & Design Studio',
  description: 'Selrahc Architects is a premier architecture firm specialising in luxury residential design, renovations, and architectural consulting across South Africa.',
  keywords: 'architecture, residential design, renovations, architectural studio, Johannesburg, South Africa, luxury homes, custom house plans',
  robots: 'index, follow',
  metadataBase: new URL('https://selrahcarchitects.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-ZA': '/',
      'fr-ZA': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Selrahc Architects',
    title: 'Selrahc Architects | Award-Winning Architecture & Design Studio',
    description: 'Premier architecture firm specialising in luxury residential design, renovations, and architectural consulting.',
    url: 'https://selrahcarchitects.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selrahc Architects',
    description: 'Designing Spaces. Creating Legacies.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    name: 'Selrahc Architects',
    founder: { '@type': 'Person', name: 'Charles Kamba' },
    address: { '@type': 'PostalAddress', streetAddress: '65 Somerset Road, Kensington', addressLocality: 'Johannesburg', addressRegion: 'Gauteng', postalCode: '2194', addressCountry: 'ZA' },
    telephone: '+27 73 697 4907',
    email: 'selrahc.architects@gmail.com',
    url: 'https://selrahcarchitects.com',
    description: 'Premier architecture firm specialising in luxury residential design, renovations, and architectural consulting.',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
