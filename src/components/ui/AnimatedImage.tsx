'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export default function AnimatedImage({ src, alt, className = '', priority = false, fill, width, height, sizes }: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`overflow-hidden ${className}`}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || '100vw'}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 800}
          className="w-full h-full object-cover"
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        />
      )}
    </motion.div>
  );
}
