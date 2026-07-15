'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  const { dict } = useLanguage();

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-white">
        <div className="container-main">
          <TextReveal as="h1" className="font-heading text-3xl md:text-5xl lg:text-6xl text-arch-black text-center leading-tight">
            {dict.contact.title}
          </TextReveal>
          <ScrollReveal delay={0.1} className="text-center max-w-2xl mx-auto mt-3 md:mt-4">
            <p className="text-arch-gray text-sm md:text-base">{dict.contact.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <ScrollReveal>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-arch-black mb-2">Selrahc Architects</h3>
                  <p className="text-arch-gray text-sm md:text-base whitespace-pre-line leading-relaxed">{dict.contact.address}</p>
                </div>
                <div>
                  <p className="text-arch-gray text-sm md:text-base">
                    <strong className="text-arch-black">{dict.contact.phoneLabel}:</strong>{' '}
                    <a href={`tel:${dict.contact.phone.replace(/\s/g, '')}`} className="hover:text-arch-bronze transition-colors">{dict.contact.phone}</a>
                  </p>
                  <p className="text-arch-gray text-sm md:text-base mt-2">
                    <strong className="text-arch-black">Email:</strong>{' '}
                    <a href={`mailto:${dict.contact.email}`} className="hover:text-arch-bronze transition-colors break-all">{dict.contact.email}</a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
