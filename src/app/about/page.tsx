'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import Link from 'next/link';

const values = ['innovation', 'integrity', 'precision', 'sustainability', 'clientFocus'] as const;

export default function AboutPage() {
  const { dict } = useLanguage();

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-white">
        <div className="container-main">
          <TextReveal as="h1" className="font-heading text-3xl md:text-5xl lg:text-6xl text-arch-black text-center leading-tight">
            {dict.about.title}
          </TextReveal>
          <ScrollReveal delay={0.1} className="text-center max-w-2xl mx-auto mt-3 md:mt-4">
            <p className="text-arch-gray text-sm md:text-base">{dict.about.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/img-47-46.jpg"
                  alt="Selrahc Architects"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-arch-bronze">Selrahc Architects</span>
              <h2 className="font-heading text-2xl md:text-4xl text-arch-black leading-tight mt-3 md:mt-4">
                {dict.about.ourStory}
              </h2>
              <p className="mt-4 md:mt-6 text-arch-gray text-sm md:text-base leading-relaxed">{dict.about.mission}</p>
              <p className="mt-3 md:mt-4 text-arch-gray text-sm md:text-base leading-relaxed">{dict.about.vision}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-arch-white">
        <div className="container-main">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-arch-bronze">{dict.about.founderHeading}</span>
            <h2 className="font-heading text-2xl md:text-4xl text-arch-black mt-3 md:mt-4">{dict.about.founderName}</h2>
            <p className="text-arch-gray text-xs md:text-sm mt-1 md:mt-2">{dict.about.founderTitle}</p>
            <p className="mt-4 md:mt-6 text-arch-gray text-sm md:text-base leading-relaxed">{dict.about.founderBio}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <TextReveal as="h2" className="font-heading text-2xl md:text-4xl text-arch-black text-center">
            {dict.about.valuesTitle}
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mt-10 md:mt-16">
            {values.map((key, index) => {
              const value = dict.about.values[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 md:p-6 border border-arch-gray/20 hover:border-arch-bronze/50 transition-colors"
                >
                  <span className="text-arch-bronze font-heading text-xl md:text-2xl">0{index + 1}</span>
                  <h3 className="font-heading text-lg md:text-xl text-arch-black mt-2 md:mt-3">{value.title}</h3>
                  <p className="text-arch-gray text-sm mt-2 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-arch-black text-center">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-4xl text-white">{dict.about.cta}</h2>
            <div className="mt-8">
              <Link href="/contact" className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white text-white hover:bg-white hover:text-arch-black transition-all duration-300 min-h-[52px]">
                {dict.contact.cta}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
