'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  lang: string
  dict: any
}

const heroImages = [
  '/images/image-01.jpg',
  '/images/image-04.jpg',
  '/images/image-02.jpg',
  '/images/image-03.jpg',
  '/images/image-05.jpg',
]

export default function Hero({ lang, dict }: HeroProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-all duration-[1500ms] ease-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: `scale(${i === current ? 1 : 1.05})`,
          }}
        >
          <Image
            src={src}
            alt={`Selrahc Architects ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative h-full container-premium flex flex-col justify-center">
        <div className="max-w-3xl">
          <span className="inline-block font-alt text-[11px] tracking-[0.3em] text-gold-500 mb-6 animate-fade-in">
            Selrahc Architects
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light leading-[0.95] tracking-tight mb-8 animate-fade-up">
            {dict.hero.title}
          </h1>
          <p className="font-body text-lg md:text-xl text-stone-300 font-light leading-relaxed max-w-xl mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link href={`/${lang}/portfolio`} className="btn-primary">
              {dict.hero.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href={`/${lang}/contact`} className="btn-outline">
              {dict.hero.contact}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex gap-3">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all duration-700 ${
                  i === current ? 'w-12 bg-gold-500' : 'w-6 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        <span className="font-alt text-[10px] tracking-[0.3em] text-stone-500 -rotate-90 origin-center mb-8">
          SCROLL
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold-500/50 to-transparent mx-auto" />
      </div>
    </section>
  )
}
