'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const { dict } = useLanguage();
  return (
    <section className="min-h-screen flex items-center justify-center bg-arch-white">
      <div className="text-center">
        <h1 className="font-heading text-8xl md:text-9xl text-arch-black">404</h1>
        <p className="text-arch-gray mt-4">{dict.notFound.message}</p>
        <div className="mt-8"><Button href="/" variant="outline">{dict.notFound.cta}</Button></div>
      </div>
    </section>
  );
}
