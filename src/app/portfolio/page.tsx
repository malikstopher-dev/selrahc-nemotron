'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import { projects, categories } from '@/data/projects';
import SectionTitle from '@/components/ui/SectionTitle';

export default function PortfolioPage() {
  const { dict } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const catLabels: Record<string, string> = {
    all: dict.portfolio.categories.all,
    residential: dict.portfolio.categories.residential,
    renovations: dict.portfolio.categories.renovations,
    interior: dict.portfolio.categories.interior,
    conceptual: dict.portfolio.categories.conceptual,
    renderings: dict.portfolio.categories.renderings,
  };

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-20 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.portfolio.title} subtitle={dict.portfolio.subtitle} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 md:px-5 py-2.5 md:py-2 text-[10px] md:text-xs uppercase tracking-[0.2em] border transition-all duration-300 min-h-[40px] ${
                  activeCategory === cat.id
                    ? 'border-arch-bronze text-arch-bronze bg-arch-bronze/10'
                    : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {catLabels[cat.id]}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 lg:gap-8 space-y-4 md:space-y-6 lg:space-y-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <Link
                    href={`/portfolio/${project.id}`}
                    className="group block relative overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        width={800}
                        height={index % 3 === 0 ? 1000 : index % 3 === 1 ? 700 : 900}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        <span className="text-arch-bronze text-[10px] uppercase tracking-[0.2em]">
                          {catLabels[project.category]}
                        </span>
                        <h3 className="text-white text-base md:text-lg font-heading mt-0.5">{project.title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-arch-gray">{dict.portfolio.noProjectsFound}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
