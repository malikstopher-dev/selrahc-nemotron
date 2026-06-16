'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { projects, heroImages, allImages } from '@/data/projects';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';

export default function HomePage() {
  const { dict } = useLanguage();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = projects.slice(0, 4);
  const services = dict.services.items;
  const processSteps = dict.process.steps;
  const testimonials = dict.testimonials.items;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-dvh min-h-[600px] md:min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentHero]}
              alt="Selrahc Architects portfolio"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        <div className="relative h-full container-main flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="inline-block text-arch-bronze text-[10px] md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6"
            >
              Selrahc Architects
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
            >
              {dict.hero.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-4 md:mt-6 text-white/80 text-sm md:text-lg max-w-xl leading-relaxed"
            >
              {dict.hero.subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link
                href="/quote"
                className="w-full sm:w-auto text-center text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white text-white hover:bg-white hover:text-arch-black transition-all duration-300 min-h-[52px] flex items-center justify-center"
              >
                {dict.hero.ctaPrimary}
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto text-center text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white/60 text-white/90 hover:bg-white hover:text-arch-black hover:border-white transition-all duration-300 min-h-[52px] flex items-center justify-center"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-32">
        <div className="container-main">
          <SectionTitle
            label={dict.home.selectedWorks}
            title={dict.home.featuredProjects}
            subtitle={dict.home.featuredProjectsSub}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.id}`}
                className="group relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[4/3] md:aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <span className="text-arch-bronze text-[10px] md:text-xs uppercase tracking-[0.2em]">{project.category}</span>
                    <h3 className="text-white text-lg md:text-2xl font-heading mt-0.5 md:mt-1">{project.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm mt-0.5">{project.location} &middot; {project.year}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <RevealText className="text-center mt-10 md:mt-12">
            <Link
              href="/portfolio"
              className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-arch-black text-arch-black hover:bg-arch-black hover:text-white transition-all duration-300 min-h-[52px]"
            >
              {dict.home.viewAllProjects}
            </Link>
          </RevealText>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-32 bg-arch-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <RevealText>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/img-47-46-1.jpg"
                  alt="Selrahc Architects studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </RevealText>
            <RevealText delay={0.2}>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-arch-bronze">
                {dict.home.aboutStudio}
              </span>
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-arch-black leading-tight mt-3 md:mt-4">
                {dict.about.title}
              </h2>
              <p className="mt-4 md:mt-6 text-arch-gray text-sm md:text-base leading-relaxed">
                {dict.about.mission}
              </p>
              <p className="mt-3 md:mt-4 text-arch-gray text-sm md:text-base leading-relaxed">
                {dict.about.vision}
              </p>
              <div className="mt-6 md:mt-8">
                <Link
                  href="/about"
                  className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-arch-black text-arch-black hover:bg-arch-black hover:text-white transition-all duration-300 min-h-[48px]"
                >
                  {dict.home.learnMore}
                </Link>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-32">
        <div className="container-main">
          <SectionTitle
            label={dict.home.whatWeDo}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group p-6 md:p-8 border border-arch-gray/20 hover:border-arch-bronze/50 transition-colors duration-500"
              >
                <span className="text-arch-bronze text-2xl md:text-3xl font-heading">0{index + 1}</span>
                <h3 className="text-base md:text-lg font-heading text-arch-black mt-3 md:mt-4 group-hover:text-arch-bronze transition-colors">
                  {service.title}
                </h3>
                <p className="text-arch-gray text-sm mt-2 md:mt-3 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <RevealText className="text-center mt-10 md:mt-12">
            <Link
              href="/services"
              className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 border border-arch-black text-arch-black hover:bg-arch-black hover:text-white transition-all duration-300 min-h-[48px]"
            >
              {dict.services.cta}
            </Link>
          </RevealText>
        </div>
      </section>

      {/* Gallery / Selected Work */}
      <section className="py-16 md:py-32 bg-arch-black">
        <div className="container-main mb-6 md:mb-8">
          <SectionTitle
            label={dict.home.selectedWork}
            title={dict.home.architecturalGallery}
            subtitle=""
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] md:gap-2 px-[2px] md:px-2">
          {allImages.map((src, i) => (
            <Link key={i} href="/portfolio" className="group relative overflow-hidden aspect-square">
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="w-full h-full"
              >
                <Image
                  src={src}
                  alt="Selrahc Architects project"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {dict.home.view}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-32">
        <div className="container-main">
          <SectionTitle
            title={dict.process.title}
            subtitle={dict.process.subtitle}
          />
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-arch-gray/20 -translate-x-1/2" />
            <div className="space-y-10 md:space-y-12 lg:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right lg:ml-0' : 'lg:pl-16 lg:ml-auto'}`}
                >
                  <div className="hidden lg:flex absolute top-0 w-8 h-8 rounded-full bg-arch-bronze items-center justify-center text-white text-xs font-medium"
                    style={{ [index % 2 === 0 ? 'right' : 'left']: '-16px' }}>
                    {index + 1}
                  </div>
                  <div className="lg:hidden flex items-center gap-4 mb-3">
                    <span className="w-10 h-10 rounded-full bg-arch-bronze flex items-center justify-center text-white text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="font-heading text-lg md:text-xl text-arch-black">{step.title}</h3>
                  </div>
                  <h3 className="hidden lg:block font-heading text-2xl text-arch-black mb-3">{step.title}</h3>
                  <p className="text-arch-gray text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-32 bg-arch-white">
        <div className="container-main">
          <SectionTitle
            title={dict.testimonials.title}
            subtitle={dict.testimonials.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 md:p-8 bg-white border border-arch-gray/10"
              >
                <span className="text-4xl md:text-5xl font-heading text-arch-bronze/30 leading-none">&ldquo;</span>
                <p className="text-arch-gray text-sm leading-relaxed mt-1 md:mt-2 italic">
                  {testimonial.text}
                </p>
                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-arch-gray/10">
                  <p className="text-arch-black text-sm font-medium">{testimonial.name}</p>
                  <p className="text-arch-gray text-xs mt-0.5">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-32 bg-arch-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/img-47-44-1.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container-main relative text-center">
          <RevealText>
            <h2 className="font-heading text-2xl md:text-5xl text-white leading-tight">
              {dict.home.letsCreate}
            </h2>
            <p className="mt-4 md:mt-6 text-arch-gray text-sm md:text-base max-w-xl mx-auto">
              {dict.home.readyToBring}
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white text-white hover:bg-white hover:text-arch-black transition-all duration-300 min-h-[52px] flex items-center justify-center"
              >
                {dict.contact.cta}
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto text-center text-xs uppercase tracking-[0.2em] px-8 py-4 bg-arch-bronze text-white hover:bg-arch-bronze/90 transition-all duration-300 min-h-[52px] flex items-center justify-center"
              >
                {dict.nav.quote}
              </Link>
            </div>
          </RevealText>
        </div>
      </section>
    </>
  );
}
