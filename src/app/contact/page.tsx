'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  const { dict } = useLanguage();

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-white">
        <div className="container-main">
          <SectionTitle title={dict.contact.title} subtitle={dict.contact.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <RevealText>
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
            </RevealText>

            <RevealText delay={0.2}>
              <ContactForm />
            </RevealText>
          </div>
        </div>
      </section>
    </>
  );
}
