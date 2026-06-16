'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selected === null) return
    if (e.key === 'Escape') setSelected(null)
    if (e.key === 'ArrowRight') setSelected((prev) => Math.min((prev ?? 0) + 1, images.length - 1))
    if (e.key === 'ArrowLeft') setSelected((prev) => Math.max((prev ?? 0) - 1, 0))
  }, [selected, images.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2">
          {images.map((src, i) => (
          <div
            key={src}
            className={`relative overflow-hidden cursor-pointer group ${
              i === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            style={{ aspectRatio: i === 0 ? '16/10' : '4/3' }}
            onClick={() => setSelected(i)}
          >
            <Image
              src={src}
              alt={`${title} - Image ${i + 1}`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[60] bg-[#0a0a0a]/98 backdrop-blur-2xl flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] m-8">
            <Image
              src={images[selected]}
              alt={`${title} - Image ${selected + 1}`}
              fill
              className="object-contain"
              priority
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={(e) => { e.stopPropagation(); setSelected((prev) => Math.max((prev ?? 1) - 1, 0)) }}
              className="text-white/60 hover:text-white transition-colors disabled:opacity-20"
              disabled={selected === 0}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="font-alt text-xs tracking-wider text-stone-400">
              {selected + 1} / {images.length}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setSelected((prev) => Math.min((prev ?? 0) + 1, images.length - 1)) }}
              className="text-white/60 hover:text-white transition-colors disabled:opacity-20"
              disabled={selected >= images.length - 1}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
