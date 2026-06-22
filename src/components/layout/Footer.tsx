'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageProvider';
import { locales, localeNames } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export default function Footer() {
  const { dict, locale, setLocale } = useLanguage();

  return (
    <footer className="bg-arch-black text-white">
      <div className="container-main py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div>
            <Link href="/" className="inline-block" aria-label="Selrahc Architects Home">
              <Image
                src="/images/logo.png"
                alt="Selrahc Architects"
                width={140}
                height={32}
                className="h-6 md:h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 md:mt-6 text-sm text-arch-gray leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-bronze mb-4 md:mb-6">
              {dict.footer.quickLinks}
            </h4>
            <nav className="flex flex-col gap-2.5 md:gap-3">
              {[
                { href: '/', key: 'home' },
                { href: '/about', key: 'about' },
                { href: '/portfolio', key: 'portfolio' },
                { href: '/process', key: 'process' },
                { href: '/contact', key: 'contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center"
                >
                  {dict.nav[link.key as keyof typeof dict.nav]}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-bronze mb-4 md:mb-6">
              {dict.footer.services}
            </h4>
            <nav className="flex flex-col gap-2.5 md:gap-3">
              {dict.services.items.map((s) => (
                <Link key={s.title} href="/services" className="text-sm text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center">
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-bronze mb-4 md:mb-6">
              {dict.footer.contactInfo}
            </h4>
            <div className="text-sm text-arch-gray space-y-2.5 md:space-y-3">
              <p className="whitespace-pre-line leading-relaxed">{dict.contact.address}</p>
              <p>
                <a href={`tel:${dict.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors min-h-[36px] inline-flex items-center">
                  {dict.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${dict.contact.email}`} className="hover:text-white transition-colors break-all min-h-[36px] inline-flex items-center">
                  {dict.contact.email}
                </a>
              </p>
            </div>

            <div className="mt-6 md:mt-8">
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-bronze mb-3 md:mb-4">
                Language
              </h4>
              <div className="flex flex-wrap gap-2">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l as Locale)}
                    className={`text-xs tracking-wider px-4 py-2.5 border transition-colors min-h-[40px] min-w-[48px] ${
                      locale === l
                        ? 'border-arch-bronze text-arch-bronze'
                        : 'border-arch-gray/30 text-arch-gray hover:border-arch-gray'
                    }`}
                    aria-label={l === 'en' ? 'Switch to English' : 'Passer en français'}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-arch-gray text-center md:text-left">
              &copy; {new Date().getFullYear()} Selrahc Architects. {dict.footer.rights}
            </p>
            <p className="text-xs text-arch-gray text-center md:text-left">
              Website by{' '}
              <a href="https://stopher-malik.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Stopher Malik
              </a>
            </p>
          </div>
          <div className="flex items-center gap-5 md:gap-6">
            <a href="#" className="text-xs text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center" aria-label="Facebook">Facebook</a>
            <a href="#" className="text-xs text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center" aria-label="Instagram">Instagram</a>
            <a href="#" className="text-xs text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://wa.me/27736974907?text=Hello%20Selrahc%20Architects%2C%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" className="text-xs text-arch-gray hover:text-white transition-colors min-h-[36px] flex items-center" aria-label="WhatsApp">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
