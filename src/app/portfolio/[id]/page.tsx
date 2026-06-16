'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { projects, getProject } from '@/data/projects';
import Button from '@/components/ui/Button';

export default function ProjectDetailPage() {
  const { dict } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const project = getProject(id);

  if (!project) {
    return (
      <section className="pt-32 pb-20">
        <div className="container-main text-center">
          <h1 className="font-heading text-3xl md:text-4xl text-arch-black">{dict.portfolio.projectNotFound}</h1>
          <div className="mt-8"><Button href="/portfolio" variant="outline">{dict.portfolio.backToPortfolio}</Button></div>
        </div>
      </section>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const catLabels: Record<string, string> = {
    residential: dict.portfolio.categories.residential,
    renovations: dict.portfolio.categories.renovations,
    interior: dict.portfolio.categories.interior,
    conceptual: dict.portfolio.categories.conceptual,
    renderings: dict.portfolio.categories.renderings,
  };

  return (
    <>
      <section className="pt-16 md:pt-20">
        <div className="relative w-full h-[45vh] md:h-[70vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-main pb-8 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-arch-bronze text-[10px] md:text-xs uppercase tracking-[0.2em]">
                {catLabels[project.category]}
              </span>
              <h1 className="font-heading text-2xl md:text-5xl lg:text-6xl text-white mt-1 md:mt-2">{project.title}</h1>
              <p className="text-white/60 text-xs md:text-sm mt-1 md:mt-2">{project.location} &middot; {project.year}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-arch-gray text-sm md:text-lg leading-relaxed">{project.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 md:pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {project.images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 border-t border-arch-gray/10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="w-full md:w-auto">
              {prevProject ? (
                <Link href={`/portfolio/${prevProject.id}`} className="group block">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-gray">{dict.portfolio.prevProject}</span>
                  <p className="font-heading text-base md:text-lg text-arch-black group-hover:text-arch-bronze transition-colors mt-0.5">{prevProject.title}</p>
                </Link>
              ) : <div />}
            </div>
            <Link href="/portfolio" className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-gray hover:text-arch-black transition-colors min-h-[44px] flex items-center">
              {dict.portfolio.backToPortfolio}
            </Link>
            <div className="w-full md:w-auto md:text-right">
              {nextProject ? (
                <Link href={`/portfolio/${nextProject.id}`} className="group block">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-arch-gray">{dict.portfolio.nextProject}</span>
                  <p className="font-heading text-base md:text-lg text-arch-black group-hover:text-arch-bronze transition-colors mt-0.5">{nextProject.title}</p>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
