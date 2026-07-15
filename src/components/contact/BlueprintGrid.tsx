'use client';

import { useRef, useId } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface Option {
  value: string;
  label: string;
}

interface BlueprintGridProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function BlueprintGrid({
  label,
  name,
  value,
  options,
  onChange,
}: BlueprintGridProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLFieldSetElement>(null);
  const lineRefs = useRef<(SVGRectElement | null)[]>([]);
  const labelRef = useRef<HTMLLegendElement>(null);

  useGSAP(
    () => {
      if (!labelRef.current) return;

      const lines = lineRefs.current.filter(Boolean) as SVGRectElement[];
      const widths = lines.map((rect) => rect.getTotalLength());
      lines.forEach((rect, i) => {
        gsap.set(rect, { strokeDasharray: widths[i], strokeDashoffset: widths[i] });
      });

      const tl = gsap.timeline({ delay: 0.35, defaults: { ease: 'power4.out' } });
      tl.to(lines, { strokeDashoffset: 0, duration: 1.2, ease: 'power3.inOut', stagger: 0.05 })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8');

      return () => {
        tl.kill();
      };
    },
    { scope: wrapperRef, dependencies: [] }
  );

  return (
    <fieldset ref={wrapperRef} className="w-full">
      <legend
        ref={labelRef}
        className="text-xs uppercase tracking-[0.2em] text-arch-bronze mb-4 will-change-transform opacity-0"
      >
        {label}
      </legend>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className="relative group text-left outline-none focus-visible:ring-1 focus-visible:ring-arch-bronze"
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <rect
                  ref={(el) => { lineRefs.current[index] = el; }}
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke={isSelected ? '#C8A97E' : 'rgba(107, 114, 128, 0.35)'}
                  strokeWidth={isSelected ? 1.5 : 1}
                />
              </svg>

              <input
                id={`${id}-${option.value}`}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <span
                className={`relative z-10 block w-full px-4 py-3.5 text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isSelected ? 'text-arch-bronze' : 'text-arch-gray group-hover:text-arch-black'
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
