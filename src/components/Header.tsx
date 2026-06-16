'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  lang: string
  dict: any
}

const navItems = [
  { key: 'home', href: '' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'services', href: '/services' },
  { key: 'process', href: '/process' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
]

export default function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(`/${lang}${href}`)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium flex items-center justify-between h-18 md:h-22">
        <Link href={`/${lang}`} className="relative z-10 flex-shrink-0 block w-28 md:w-36">
          <Image
            src="/images/logo.png"
            alt="Selrahc Architects"
            width={288}
            height={64}
            className="w-full h-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${lang}${href}`}
              className={`relative font-alt text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive(href) ? 'text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              {key === 'home' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70 hover:opacity-100 transition-opacity">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : (
                dict.nav[key as keyof typeof dict.nav]
              )}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold-500 transition-all duration-500 ${
                isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          <Link
            href={`/${lang}/quote`}
            className="btn-primary text-[9px] md:text-[10px] !px-5 md:!px-6 !py-2.5 md:!py-3 ml-2"
          >
            {dict.nav.quote}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:block relative">
            <Link
              href={pathname.replace(`/${lang}`, `/${lang === 'en' ? 'fr' : 'en'}`)}
              className="font-alt text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors px-2 py-1"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-500 transition-all duration-500 group-hover:w-full" />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[4px] -ml-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-400 ease-out ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-400 ease-out ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-400 ease-out ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-[#0a0a0a] z-0 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 px-6" onClick={(e) => e.stopPropagation()}>
          {navItems.map(({ key, href }, i) => (
            <Link
              key={key}
              href={`/${lang}${href}`}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-2xl md:text-3xl lg:text-4xl text-white transition-all duration-500 hover:text-gold-500 ${
                menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {dict.nav[key as keyof typeof dict.nav]}
            </Link>
          ))}
          <Link
            href={`/${lang}/quote`}
            onClick={() => setMenuOpen(false)}
            className={`btn-primary text-base w-full text-center mt-4 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${navItems.length * 60}ms`, transitionDuration: '500ms' }}
          >
            {dict.nav.quote}
          </Link>
          <div className={`flex gap-6 mt-8 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               style={{ transitionDelay: `${(navItems.length + 1) * 60}ms`, transitionDuration: '500ms' }}>
            <Link
              href={pathname.replace(`/${lang}`, '/en')}
              className={`font-alt text-sm uppercase tracking-[0.2em] transition-colors ${lang === 'en' ? 'text-gold-500' : 'text-stone-500'}`}
            >
              EN
            </Link>
            <span className="text-stone-600">|</span>
            <Link
              href={pathname.replace(`/${lang}`, '/fr')}
              className={`font-alt text-sm uppercase tracking-[0.2em] transition-colors ${lang === 'fr' ? 'text-gold-500' : 'text-stone-500'}`}
            >
              FR
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}