'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  splitBy?: 'words' | 'lines';
  once?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  splitBy = 'words',
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !containerRef.current) return;

      const text = containerRef.current.textContent || '';
      const parts = splitBy === 'words' ? text.split(' ') : [text];

      containerRef.current.innerHTML = parts
        .map((part) =>
          part.trim()
            ? `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block text-reveal-inner">${part}</span></span>`
            : ''
        )
        .join(splitBy === 'words' ? ' ' : '');

      const inners = containerRef.current.querySelectorAll('.text-reveal-inner');

      gsap.fromTo(
        inners,
        { y: '110%', rotate: 2 },
        {
          y: '0%',
          rotate: 0,
          duration: 1.1,
          delay,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [children, splitBy, delay, stagger, once] }
  );

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
