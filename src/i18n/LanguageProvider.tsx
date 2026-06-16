'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';
import type { Dictionary } from './dictionary';
import { dictionaries } from './dictionary';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  dict: dictionaries[defaultLocale],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dict, setDict] = useState<Dictionary>(dictionaries[defaultLocale]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('selrahc-locale') as Locale | null;
    if (stored && (stored === 'en' || stored === 'fr')) {
      setLocaleState(stored);
      setDict(dictionaries[stored]);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setDict(dictionaries[newLocale]);
    localStorage.setItem('selrahc-locale', newLocale);
  }, []);

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: defaultLocale, setLocale: () => {}, dict: dictionaries[defaultLocale] }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
