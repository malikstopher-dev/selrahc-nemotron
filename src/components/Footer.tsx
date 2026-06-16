import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  lang: string
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  const links = [
    { key: 'home', href: '' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'services', href: '/services' },
    { key: 'process', href: '/process' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ]

  return (
    <footer className="relative bg-charcoal-900 border-t border-white/[0.04]">
      <div className="container-premium py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-6 w-36 md:w-44">
              <Image
                src="/images/logo.png"
                alt="Selrahc Architects"
                width={352}
                height={80}
                className="w-full h-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-body text-sm max-w-md leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-alt text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-6">
              {dict.footer.quick_links}
            </h4>
            <ul className="space-y-3">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}${href}`}
                    className="font-body text-sm text-stone-400 hover:text-white transition-colors duration-300"
                  >
                    {dict.nav[key as keyof typeof dict.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-alt text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-6">
              {dict.footer.contact_info}
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 shrink-0">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{dict.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@selrahcarchitects.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+27 11 234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-alt text-[10px] uppercase tracking-[0.2em] text-stone-600">
            &copy; {new Date().getFullYear()} Selrahc Architects. {dict.footer.rights}
          </p>
          <div className="flex gap-6">
            {['en', 'fr'].map((l) => (
              <Link
                key={l}
                href={lang === l ? '#' : `/${l}`}
                className={`font-alt text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  lang === l ? 'text-white' : 'text-stone-600 hover:text-white'
                }`}
              >
                {l === 'en' ? 'English' : 'Français'}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
