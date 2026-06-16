'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

export default function ProcessPage() {
  const { dict } = useLanguage();
  const steps = dict.process.steps;

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.process.title} subtitle={dict.process.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main max-w-4xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-arch-gray/20" />
            <div className="space-y-10 md:space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-0 md:pl-20"
                >
                  <div className="hidden md:flex absolute left-4 top-0 w-8 h-8 rounded-full bg-arch-bronze items-center justify-center text-white text-sm font-medium -translate-x-1/2">
                    {index + 1}
                  </div>
                  <div className="md:hidden flex items-center gap-4 mb-3">
                    <span className="w-10 h-10 rounded-full bg-arch-bronze flex items-center justify-center text-white text-sm font-medium shrink-0">{index + 1}</span>
                    <h3 className="font-heading text-lg md:text-xl text-arch-black">{step.title}</h3>
                  </div>
                  <h3 className="hidden md:block font-heading text-2xl text-arch-black mb-3">{step.title}</h3>
                  <p className="text-arch-gray text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-arch-black text-center">
        <div className="container-main">
          <RevealText>
            <h2 className="font-heading text-2xl md:text-4xl text-white">{dict.process.beginJourney}</h2>
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
