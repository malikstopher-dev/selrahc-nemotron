'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Locale } from './config';
import { defaultLocale } from './config';
import type { Dictionary } from './dictionary';
import { dictionaries } from './dictionary';
import { createClient } from '@/lib/supabase/client';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
  cmsLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  dict: dictionaries[defaultLocale],
  cmsLoaded: false,
});

function mergeCmsContent(base: Dictionary, cmsData: Record<string, unknown> | null): Dictionary {
  if (!cmsData) return base;

  const merged = { ...base };

  for (const key of Object.keys(merged)) {
    const cmsValue = cmsData[key];
    if (cmsValue && typeof cmsValue === 'object' && typeof merged[key] === 'object' && merged[key] !== null) {
      merged[key] = { ...(merged[key] as Record<string, unknown>), ...(cmsValue as Record<string, unknown>) } as never;
    }
  }

  return merged;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dict, setDict] = useState<Dictionary>(dictionaries[defaultLocale]);
  const [cmsLoaded, setCmsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('selrahc-locale') as Locale | null;
    const initial = stored && (stored === 'en' || stored === 'fr') ? stored : defaultLocale;
    setLocaleState(initial);

    // Fetch CMS content from Supabase
    const supabase = createClient();
    supabase
      .from('site_content')
      .select('*')
      .eq('locale', initial)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const cmsMap: Record<string, unknown> = {};
          for (const item of data) {
            cmsMap[item.key] = item.value;
          }
          setDict(mergeCmsContent(dictionaries[initial], cmsMap));
        }
        setCmsLoaded(true);
      })
      .catch(() => {
        setCmsLoaded(true);
      });
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('selrahc-locale', newLocale);

    const supabase = createClient();
    supabase
      .from('site_content')
      .select('*')
      .eq('locale', newLocale)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const cmsMap: Record<string, unknown> = {};
          for (const item of data) {
            cmsMap[item.key] = item.value;
          }
          setDict(mergeCmsContent(dictionaries[newLocale], cmsMap));
        } else {
          setDict(dictionaries[newLocale]);
        }
      })
      .catch(() => {
        setDict(dictionaries[newLocale]);
      });
  }, []);

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: defaultLocale, setLocale: () => {}, dict: dictionaries[defaultLocale], cmsLoaded: false }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, cmsLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
