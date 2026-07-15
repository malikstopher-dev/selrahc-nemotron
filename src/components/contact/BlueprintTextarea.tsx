'use client';

import { useRef, useState, useId } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface BlueprintTextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  onChange: (value: string) => void;
}

export default function BlueprintTextarea({
  label,
  name,
  value,
  placeholder,
  required,
  error,
  rows = 5,
  onChange,
}: BlueprintTextareaProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGRectElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  useGSAP(
    () => {
      if (!lineRef.current || !labelRef.current) return;

      const rect = lineRef.current;
      const width = rect.getTotalLength();
      gsap.set(rect, { strokeDasharray: width, strokeDashoffset: width });

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power4.out' } });
      tl.to(rect, { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut' })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=1');

      return () => {
        tl.kill();
      };
    },
    { scope: wrapperRef, dependencies: [] }
  );

  useGSAP(
    () => {
      if (!labelRef.current || !lineRef.current) return;

      const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power4.out' } });
      if (isActive) {
        tl.to(labelRef.current, { y: -24, scale: 0.8, color: '#C8A97E', transformOrigin: 'left top' }, 0)
          .to(lineRef.current, { stroke: '#C8A97E', strokeWidth: 1.5, duration: 0.6 }, 0);
      } else {
        tl.to(labelRef.current, { y: 0, scale: 1, color: '#6B7280', transformOrigin: 'left top' }, 0)
          .to(lineRef.current, { stroke: 'rgba(107, 114, 128, 0.35)', strokeWidth: 1, duration: 0.6 }, 0);
      }

      return () => {
        tl.kill();
      };
    },
    { scope: wrapperRef, dependencies: [isActive] }
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <rect
          ref={lineRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="0"
          ry="0"
          fill="none"
          stroke="rgba(107, 114, 128, 0.35)"
          strokeWidth="1"
        />
      </svg>

      <label
        ref={labelRef}
        htmlFor={id}
        className="absolute left-4 top-4 text-xs uppercase tracking-[0.2em] text-arch-gray pointer-events-none origin-left will-change-transform opacity-0"
      >
        {label}
        {required && <span className="text-arch-bronze ml-1">*</span>}
      </label>

      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={isActive ? placeholder : ''}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="relative z-10 w-full bg-transparent px-4 pt-9 pb-4 text-arch-black text-sm outline-none resize-none placeholder:text-arch-gray/40"
      />

      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
