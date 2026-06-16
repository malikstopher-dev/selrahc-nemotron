'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ label, title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-10 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.25em] text-arch-bronze mb-3 md:mb-4">
          {label}
        </span>
      )}
      <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-arch-black leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 md:mt-4 text-arch-gray text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
