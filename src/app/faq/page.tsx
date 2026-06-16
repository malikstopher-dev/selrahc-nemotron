'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

function FaqItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-arch-gray/20">
      <button
        onClick={onClick}
        className="w-full py-4 md:py-6 flex items-center justify-between text-left group min-h-[56px]"
        aria-expanded={isOpen}
      >
        <span className="text-arch-black font-heading text-base md:text-xl pr-4 group-hover:text-arch-bronze transition-colors">{q}</span>
        <span className={`text-arch-bronze text-xl md:text-2xl shrink-0 transition-transform duration-300 min-w-[24px] text-center ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 md:pb-6 text-arch-gray text-sm md:text-base leading-relaxed pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const { dict } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.faq.title} subtitle={dict.faq.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main max-w-3xl mx-auto">
          <RevealText>
            {dict.faq.items.map((item, index) => (
              <FaqItem
                key={index}
                q={item.q}
                a={item.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </RevealText>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-arch-black text-center">
        <div className="container-main">
          <RevealText>
            <h2 className="font-heading text-2xl md:text-4xl text-white">{dict.faq.stillHaveQuestions}</h2>
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
