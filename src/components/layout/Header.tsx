'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import type { Locale } from '@/i18n/config';
import { locales, localeLabels } from '@/i18n/config';

const navLinks = [
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/process', key: 'process' },
  { href: '/contact', key: 'contact' },
];

const menuVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 12 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Header() {
  const { dict, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    menu.addEventListener('keydown', handleTab);
    first?.focus();
    return () => menu.removeEventListener('keydown', handleTab);
  }, [mobileOpen]);

  const isHome = pathname === '/';
  const textColor = scrolled || !isHome ? 'text-arch-black' : 'text-white';
  const textColorMuted = scrolled || !isHome ? 'text-arch-black/70' : 'text-white/70';
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-arch-black/5'
          : isHome
            ? 'bg-gradient-to-b from-black/40 via-black/10 to-transparent backdrop-blur-[2px]'
            : 'bg-white/95 backdrop-blur-sm'
      } ${mobileOpen ? 'bg-white border-b border-arch-gray/10' : ''}`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-14 md:h-[72px]">
          <Link href="/" className="relative z-30 flex items-center gap-3" aria-label="Selrahc Architects Home">
            <Image
              src="/images/logo.png"
              alt="Selrahc Architects"
              width={140}
              height={32}
              className={`h-6 md:h-[30px] w-auto transition-all duration-500 ${
                !scrolled && isHome && !mobileOpen ? 'brightness-0 invert' : ''
              }`}
              priority
            />
            <span className={`hidden sm:block text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-500 ${
              !scrolled && isHome && !mobileOpen ? 'text-white' : 'text-arch-black'
            }`}>
              Selrahc<br/>Architects
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 py-1 ${
                    isHome && !scrolled ? 'text-white/65 hover:text-white' : 'text-arch-black/65 hover:text-arch-black'
                  } ${isActive ? '!text-arch-bronze' : ''}`}
                >
                  <span>{dict.nav[link.key as keyof typeof dict.nav]}</span>
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-px bg-arch-bronze origin-left transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/quote"
              className={`ml-3 text-[11px] uppercase tracking-[0.22em] px-5 py-2.5 transition-all duration-500 ${
                isHome && !scrolled
                  ? 'bg-white text-arch-black hover:bg-arch-bronze hover:text-white'
                  : 'bg-arch-black text-white hover:bg-arch-bronze'
              }`}
            >
              {dict.nav.quote}
            </Link>

            <div className="flex items-center gap-0.5 ml-3 pl-4 border-l border-current/10">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l as Locale)}
                  className={`text-[10px] tracking-[0.15em] px-1.5 py-1 transition-colors duration-300 ${
                    locale === l
                      ? 'text-arch-bronze'
                      : isHome && !scrolled
                        ? 'text-white/35 hover:text-white/70'
                        : 'text-arch-black/35 hover:text-arch-black/70'
                  }`}
                  aria-label={l === 'en' ? 'Switch to English' : 'Passer en français'}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-30 w-10 h-10 flex flex-col items-center justify-center gap-[5px] -mr-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-5 h-[1.5px] transition-colors duration-500 ${
                mobileOpen ? 'bg-arch-black' : scrolled || !isHome ? 'bg-arch-black' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className={`block w-5 h-[1.5px] transition-colors duration-500 ${
                mobileOpen ? 'bg-arch-black' : scrolled || !isHome ? 'bg-arch-black' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block w-5 h-[1.5px] transition-colors duration-500 ${
                mobileOpen ? 'bg-arch-black' : scrolled || !isHome ? 'bg-arch-black' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 bg-white z-20"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'en' ? 'Navigation menu' : 'Menu de navigation'}
          >
            <nav className="container-main flex flex-col gap-0 pt-24 pb-12 min-h-screen">
              {[...navLinks, { href: '/testimonials', key: 'testimonials' }, { href: '/faq', key: 'faq' }, { href: '/quote', key: 'quote' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    className={`block py-4 border-b border-arch-gray/10 text-xl font-heading transition-colors hover:text-arch-bronze ${
                      pathname === link.href ? 'text-arch-bronze' : 'text-arch-black'
                    }`}
                  >
                    {dict.nav[link.key as keyof typeof dict.nav]}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                custom={8}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="flex items-center gap-4 pt-8 mt-auto"
              >
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLocale(l as Locale);
                      setMobileOpen(false);
                    }}
                    className={`text-sm tracking-wider px-4 py-2.5 transition-colors min-w-[48px] min-h-[44px] flex items-center justify-center ${
                      locale === l
                        ? 'text-arch-bronze font-medium border border-arch-bronze'
                        : 'text-arch-black/50 border border-arch-gray/20 hover:border-arch-gray'
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
