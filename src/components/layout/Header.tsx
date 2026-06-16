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
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: 0 },
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      } ${mobileOpen ? 'bg-white shadow-sm' : ''}`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-24">
          <Link href="/" className="relative z-20" aria-label="Selrahc Architects Home">
            <Image
              src="/images/logo.png"
              alt="Selrahc Architects"
              width={140}
              height={32}
              className={`h-6 md:h-8 w-auto transition-all duration-300 ${
                mobileOpen ? '' : ''
              } ${!scrolled && isHome && !mobileOpen ? 'brightness-0 invert drop-shadow-sm' : ''}`}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isHome && !scrolled ? 'text-white/70 hover:text-white drop-shadow-sm' : 'text-arch-black/70 hover:text-arch-black'
                  } ${isActive ? 'font-medium !text-arch-bronze' : ''}`}
                >
                  {dict.nav[link.key as keyof typeof dict.nav]}
                </Link>
              );
            })}
            <Link
              href="/quote"
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                isHome && !scrolled
                  ? 'border-white text-white hover:bg-white hover:text-arch-black'
                  : 'border-arch-black text-arch-black hover:bg-arch-black hover:text-white'
              }`}
            >
              {dict.nav.quote}
            </Link>

            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-arch-gray/30">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l as Locale)}
                  className={`text-xs tracking-wider px-2 py-1 transition-colors ${
                    locale === l
                      ? 'text-arch-bronze font-medium'
                      : isHome && !scrolled
                        ? 'text-white/50 hover:text-white'
                        : 'text-arch-black/50 hover:text-arch-black'
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
            className="lg:hidden relative z-20 w-10 h-10 flex flex-col items-center justify-center gap-[5px] -mr-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                mobileOpen ? 'bg-arch-black' : scrolled || !isHome ? 'bg-arch-black' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                mobileOpen ? 'bg-arch-black' : scrolled || !isHome ? 'bg-arch-black' : 'bg-white'
              }`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
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
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 top-0 bg-white z-10 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'en' ? 'Navigation menu' : 'Menu de navigation'}
          >
            <nav className="container-main flex flex-col gap-0 pt-24 pb-12 min-h-screen">
              {[...navLinks, { href: '/testimonials', key: 'testimonials' }, { href: '/faq', key: 'faq' }, { href: '/quote', key: 'quote' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
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
