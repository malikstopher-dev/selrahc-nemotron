import type { Metadata } from 'next';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Selrahc Architects | Spatial Intelligence, Design Excellence — Johannesburg',
    template: '%s | Selrahc Architects',
  },
  description: 'Selrahc Architects is a Johannesburg-based architecture practice specialising in residential, commercial, hospitality, and interior architecture — known for spatial intelligence, design rigour, and architecture of enduring value.',
  keywords: 'architecture, residential design, commercial architecture, interior architecture, renovations, architectural studio, Johannesburg, South Africa, luxury homes, custom house plans, hospitality architecture',
  authors: [{ name: 'Stopher Malik', url: 'https://stopher-malik.co.za' }],
  creator: 'Stopher Malik',
  robots: 'index, follow',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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
    title: 'Selrahc Architects | Spatial Intelligence, Design Excellence — Johannesburg',
    description: 'A Johannesburg-based architecture practice specialising in residential, commercial, hospitality, and interior architecture — known for spatial intelligence and design rigour.',
    url: 'https://selrahcarchitects.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selrahc Architects',
    description: 'Architecture of enduring value — residential, commercial, and interior architecture by Selrahc Architects, Johannesburg.',
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
    description: 'A Johannesburg-based architecture practice specialising in residential, commercial, hospitality, and interior architecture — known for spatial intelligence and design rigour.',
    creator: {
      '@type': 'Person',
      name: 'Stopher Malik',
      url: 'https://stopher-malik.co.za',
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'SMK Web Design',
      url: 'https://smk.stopher-malik.co.za',
    },
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
        {/*
          Website designed and developed by Stopher Malik
          https://stopher-malik.co.za

          SMK Web Design
          https://smk.stopher-malik.co.za
        */}
      </body>
    </html>
  );
}
