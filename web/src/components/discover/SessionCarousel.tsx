'use client'

import { useRef, useEffect, useState } from 'react'
import type { DiscoverSession } from '@/lib/fixtures/discover-types'
import SessionCard from './SessionCard'
import { useIsMobile } from '@/hooks/useIsMobile'

interface SessionCarouselProps {
  title: string
  sessions: DiscoverSession[]
  onSelect: (session: DiscoverSession) => void
}

const arrowStyle = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

const SIDEBAR_WIDTH = 80 // ml-20 = 80px

export default function SessionCarousel({ title, sessions, onSelect }: SessionCarouselProps) {
  const isMobile = useIsMobile()
  const outerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hovering, setHovering] = useState(false)
  // leftOffset = how far we extend the scroll container to the left (reaches sidebar edge)
  const [leftOffset, setLeftOffset] = useState(14)

  // Extend carousel to right edge AND left edge (to sidebar), responsive to panel open/close
  useEffect(() => {
    if (isMobile) return  // CSS handles layout on mobile
    const el = outerRef.current
    if (!el || !el.parentElement) return

    const measure = () => {
      const { left } = el.getBoundingClientRect()
      const parent = el.parentElement!
      const parentMarginRight = parseFloat(getComputedStyle(parent).marginRight) || 0
      // When the preview panel is open the parent has marginRight: 380 —
      // shrink the carousel so the fade ends right at the panel's left edge.
      // When closed, extend to the viewport edge.
      const rightTarget = window.innerWidth - parentMarginRight

      el.style.width = `${rightTarget - left}px`

      // Extend scroll container leftward to the sidebar edge (left) and to rightTarget (right).
      // All in explicit pixels so there's no ambiguity from calc() or % resolution.
      const reach = Math.max(14, left - SIDEBAR_WIDTH)
      setLeftOffset(reach)

      const scrollEl = scrollRef.current
      if (scrollEl) {
        scrollEl.style.marginLeft = `-${reach}px`
        scrollEl.style.width = `${rightTarget - SIDEBAR_WIDTH}px`
        scrollEl.style.paddingLeft = `${reach - 14}px`
        scrollEl.style.paddingRight = `${reach + 56}px`
      }
    }

    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el.parentElement)

    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [isMobile])

  // Track scroll position to show/hide left arrow and fade
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollLeft > 0)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -666, behavior: 'smooth' })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 666, behavior: 'smooth' })

  // The button and fade are positioned so they always land at the sidebar right edge
  // regardless of screen size: viewport x = outerRef.left - (leftOffset - 10) = 80 + 10 = 90px
  const btnLeft = -(leftOffset - 40)
  const fadeLeft = -leftOffset

  return (
    <div ref={outerRef} className="mb-9" style={isMobile ? undefined : { clipPath: 'inset(0 0 0 -9999px)' }}>
      <div className={`flex items-baseline justify-between mb-3.5 ${isMobile ? '' : 'pr-12'}`}>
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          {title}
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>

      {isMobile ? (
        /* Mobile: simple CSS scroll-snap carousel */
        <div
          className="flex overflow-x-auto gap-3 pb-2 pt-1"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {sessions.map((session) => (
            <div key={session.id} className="shrink-0 w-[280px]" style={{ scrollSnapAlign: 'start' }}>
              <SessionCard
                session={session}
                onClick={() => onSelect(session)}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: JS-measured full-bleed carousel */
        <div className="relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <div
            ref={scrollRef}
            className="grid grid-flow-col gap-[2px] overflow-x-auto pb-1 pt-1"
            style={{ gridAutoColumns: '220px', scrollbarWidth: 'none' }}
          >
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => onSelect(session)}
              />
            ))}
          </div>

          {/* Left fade + button — visible once scrolled */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none transition-opacity duration-300"
            style={{
              left: `${fadeLeft}px`,
              width: `${leftOffset + 56}px`,
              background: 'linear-gradient(to left, transparent 0%, rgba(255, 243, 234, 0.25) 60%, rgba(255, 243, 234, 0.7) 100%)',
              opacity: scrolled ? 1 : 0,
            }}
          />
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 z-10"
            style={{
              left: `${btnLeft}px`,
              ...arrowStyle,
              opacity: hovering && scrolled ? 1 : 0,
              pointerEvents: hovering && scrolled ? 'auto' : 'none',
            }}
          >
            <span className="material-symbols-outlined text-on-background" style={{ fontSize: '18px' }}>
              chevron_left
            </span>
          </button>

          {/* Right fade + button — always visible, mirrors left fade width */}
          <div
            className="absolute top-0 right-0 bottom-0 pointer-events-none"
            style={{
              width: `${leftOffset + 56}px`,
              background: 'linear-gradient(to right, transparent 0%, rgba(255, 243, 234, 0.25) 60%, rgba(255, 243, 234, 0.7) 100%)',
            }}
          />
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 z-10"
            style={{
              right: 48,
              ...arrowStyle,
              opacity: hovering ? 1 : 0,
              pointerEvents: hovering ? 'auto' : 'none',
            }}
          >
            <span className="material-symbols-outlined text-on-background" style={{ fontSize: '18px' }}>
              chevron_right
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
