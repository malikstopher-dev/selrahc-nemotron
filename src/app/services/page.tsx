'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

const specImages = ['/images/img-47-36-1.jpg', '/images/img-47-38.jpg', '/images/img-47-42.jpg', '/images/img-47-44.jpg'];

export default function ServicesPage() {
  const { dict } = useLanguage();
  const services = dict.services.items;
  const specs = dict.services.specializations;

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-white">
        <div className="container-main">
          <TextReveal as="h1" className="font-heading text-3xl md:text-5xl lg:text-6xl text-arch-black text-center leading-tight">
            {dict.services.title}
          </TextReveal>
          <ScrollReveal delay={0.1} className="text-center max-w-2xl mx-auto mt-3 md:mt-4">
            <p className="text-arch-gray text-sm md:text-base">{dict.services.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="p-6 md:p-10 border border-arch-gray/20 hover:border-arch-bronze/50 transition-all duration-500 group h-full">
                  <span className="text-arch-bronze font-heading text-3xl md:text-4xl">0{index + 1}</span>
                  <h3 className="font-heading text-xl md:text-2xl text-arch-black mt-3 md:mt-4 group-hover:text-arch-bronze transition-colors">{service.title}</h3>
                  <p className="text-arch-gray text-sm md:text-base mt-3 md:mt-4 leading-relaxed">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-arch-white">
        <div className="container-main">
          <TextReveal as="h2" className="font-heading text-2xl md:text-4xl text-arch-black text-center">
            {specs.title}
          </TextReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-10 md:mt-16">
            {[specs.rendering, specs.sketch, specs.interior, specs.visualization].map((spec, i) => (
              <ScrollReveal key={spec} delay={i * 0.1}>
                <div className="relative aspect-[3/4] group overflow-hidden">
                  <Image
                    src={specImages[i]}
                    alt={spec}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                    <h4 className="text-white text-[10px] md:text-sm uppercase tracking-[0.15em]">{spec}</h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-arch-black text-center">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-4xl text-white">{dict.services.readyToStart}</h2>
            <div className="mt-8">
              <Link href="/quote" className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white text-white hover:bg-white hover:text-arch-black transition-all duration-300 min-h-[52px]">
                {dict.services.cta}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
