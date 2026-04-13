'use client'

import { useState, useCallback, useMemo } from 'react'

interface ImageCarouselProps {
  images: string[]
  productName: string
  isOwner?: boolean
}

export default function ImageCarousel({ images, productName, isOwner = false }: ImageCarouselProps) {
  const [pageIndex, setPageIndex] = useState(0)

  // Group images into pairs
  const pages = useMemo(() => {
    const result: string[][] = []
    for (let i = 0; i < images.length; i += 2) {
      result.push(images.slice(i, i + 2))
    }
    return result
  }, [images])

  const goToPrevious = useCallback(() => {
    setPageIndex(i => (i === 0 ? pages.length - 1 : i - 1))
  }, [pages.length])

  const goToNext = useCallback(() => {
    setPageIndex(i => (i === pages.length - 1 ? 0 : i + 1))
  }, [pages.length])

  if (images.length === 0) return null

  const currentPage = pages[pageIndex]

  return (
    <div className="relative">
      {/* Owner toolbar */}
      {isOwner && (
        <div className="flex items-center justify-end gap-2 mb-3">
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
            title="Add image"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>add</span>
          </button>
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
            title="Reorder images"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>reorder</span>
          </button>
        </div>
      )}

      {/* Images container */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-3">
          {currentPage.map((src, i) => (
            <div
              key={`${pageIndex}-${i}`}
              className="rounded-2xl overflow-hidden border border-orange-100/30 shadow-lg aspect-video bg-white"
            >
              <img
                src={src}
                alt={`${productName} screenshot ${pageIndex * 2 + i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Arrow buttons */}
        {pages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <span className="material-symbols-outlined text-on-background" style={{ fontSize: '18px' }}>
                chevron_left
              </span>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <span className="material-symbols-outlined text-on-background" style={{ fontSize: '18px' }}>
                chevron_right
              </span>
            </button>
          </>
        )}
      </div>

      {/* Slide indicators */}
      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPageIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === pageIndex ? '20px' : '6px',
                height: '6px',
                background: i === pageIndex
                  ? 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)'
                  : 'rgba(156, 63, 0, 0.2)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
