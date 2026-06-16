'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

export default function TestimonialsPage() {
  const { dict } = useLanguage();
  const testimonials = dict.testimonials.items;

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.testimonials.title} subtitle={dict.testimonials.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 md:p-10 bg-arch-white border border-arch-gray/10 ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                <span className="text-4xl md:text-6xl font-heading text-arch-bronze/20 leading-none">&ldquo;</span>
                <p className="text-arch-gray text-sm md:text-base leading-relaxed mt-1 md:mt-2 italic">{t.text}</p>
                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-arch-gray/10">
                  <p className="text-arch-black font-heading text-base md:text-lg">{t.name}</p>
                  <p className="text-arch-gray text-xs md:text-sm mt-0.5">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-arch-black text-center">
        <div className="container-main">
          <RevealText>
            <h2 className="font-heading text-2xl md:text-4xl text-white">{dict.testimonials.cta}</h2>
            <div className="mt-8">
              <Link href="/contact" className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white text-white hover:bg-white hover:text-arch-black transition-all duration-300 min-h-[52px]">
                {dict.contact.cta}
              </Link>
            </div>
          </RevealText>
        </div>
      </section>
    </>
  );
}
