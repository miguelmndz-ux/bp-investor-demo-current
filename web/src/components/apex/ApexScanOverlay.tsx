'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import FounderCard from './FounderCard'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'

type ScanPhase = 'scanning' | 'complete' | 'dismissed'

const PHASES = [
  { id: 1, name: 'Scanning Product Hunt top 10',    icon: 'travel_explore' },
  { id: 2, name: 'Enriching founder profiles',       icon: 'person_search'  },
  { id: 3, name: 'Creating community profile pages', icon: 'group'          },
  { id: 4, name: 'Running Decode skill',             icon: 'psychology'     },
  { id: 5, name: 'Running Rapid Course skill',       icon: 'bolt'           },
  { id: 6, name: 'Drafting outreach messages',       icon: 'edit_note'      },
] as const

const PHASE_DURATION_MS    = 8000
const PHASE_0_DURATION_MS  = 24000
const PHASE_0_INTERVAL_MS  = 2000
const PHASE_0_INITIAL_DELAY_MS = 1500
const FADE_DURATION_MS  = 600

function DotGridCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const w = canvas.offsetWidth || 370
    const h = canvas.offsetHeight || 64
    canvas.width = w
    canvas.height = h

    const PIX  = 4   // square pixel size
    const STEP = 6   // pixel + gap
    const cols = Math.floor(w / STEP)
    const rows = Math.floor(h / STEP)

    interface Pix {
      x: number; y: number
      diagNorm: number   // [0,1] diagonal position across card
      rand: number       // static random seed
      shimmerPhase: number
    }

    const pixels: Pix[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pixels.push({
          x: col * STEP,
          y: row * STEP,
          diagNorm: (col / (cols - 1 || 1)) * 0.72 + (row / (rows - 1 || 1)) * 0.28,
          rand: Math.random(),
          shimmerPhase: Math.random() * Math.PI * 2,
        })
      }
    }

    let rafId: number
    let t0 = -1

    function render(now: number) {
      if (t0 < 0) t0 = now
      const t = (now - t0) * 0.001

      ctx.clearRect(0, 0, w, h)

      const WAVE_PERIOD = 4.5
      const WAVE_WIDTH  = 0.13
      const wavePos = (t % WAVE_PERIOD) / WAVE_PERIOD

      for (const px of pixels) {
        // Diagonal scan wave
        let dist = Math.abs(px.diagNorm - wavePos)
        dist = Math.min(dist, 1 - dist)
        const wave = Math.max(0, 1 - dist / WAVE_WIDTH)

        // Slow per-pixel shimmer
        const shimmer = (Math.sin(t * 0.65 + px.shimmerPhase) + 1) * 0.5 * 0.1

        // Rare random spark
        const sparkSignal = Math.sin(t * (0.8 + px.rand * 1.1) + px.shimmerPhase * 2.7)
        const spark = sparkSignal > 0.9 ? ((sparkSignal - 0.9) / 0.1) * 0.12 : 0

        const intensity = shimmer + wave * 0.5 + spark
        if (intensity < 0.02) continue

        const capped = Math.min(1, intensity)
        const g = Math.round(160 - 15 * capped) // 160→145
        const b = Math.round(100 - 10 * capped) // 100→90
        const a = Math.min(0.35, 0.04 + intensity * 0.32)

        ctx.fillStyle = `rgba(255,${g},${b},${a.toFixed(2)})`
        ctx.fillRect(px.x, px.y, PIX, PIX)
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100%',
        height: '100%',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 14px, black calc(100% - 14px), transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0px, black 14px, black calc(100% - 14px), transparent 100%)',
      }}
    />
  )
}

function VeloCommunityCard() {
  const product = phProducts[0]
  return (
    <div className="p-6 h-full flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center gap-4">
        <img
          src={product.logo}
          alt="Velo"
          className="w-16 h-16 rounded-xl border border-white/60 shadow-sm"
          style={{ objectFit: 'contain', background: '#fff' }}
        />
        <div>
          <h3 className="font-jakarta font-black text-2xl text-on-background">Velo</h3>
          <p className="text-sm font-extrabold" style={{ color: 'rgba(156,63,0,0.7)' }}>AI Video Community</p>
        </div>
      </div>
      <p className="text-sm text-stone-500 leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {product.tagline}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Members', value: '1.2k' },
          { label: 'PH Votes', value: String(product.votes) },
          { label: 'Sessions', value: '8' },
        ].map(({ label, value }) => (
          <div key={label} className="text-center p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.6)' }}>
            <p className="font-jakarta font-black text-lg text-on-background">{value}</p>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {['Video AI', 'Async', 'Remote Teams', 'Transcription'].map(tag => (
          <span
            key={tag}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,122,47,0.1)', color: '#9c3f00' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function PhaseOverlay({ stepName }: { stepName: string }) {
  const [opacity, setOpacity]       = useState(1)
  const [transition, setTransition] = useState('none')

  useEffect(() => {
    const t1 = setTimeout(() => setTransition('opacity 1200ms ease'), 50)
    const t2 = setTimeout(() => setOpacity(0), PHASE_DURATION_MS - 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ background: 'rgba(255,250,247,1)', opacity, transition }}
    >
      <div className="absolute top-4 left-4 z-10">
        <p className="text-[11px] font-bold text-primary leading-tight">{stepName}</p>
      </div>
    </div>
  )
}

interface StepPreviewProps {
  activePhaseIndex: number
  scanPhase: ScanPhase
  visibleCount: number
}

function StepPreview({ activePhaseIndex, scanPhase, visibleCount }: StepPreviewProps) {
  const displayIndex = Math.min(activePhaseIndex, PHASES.length - 1)

  const iframeStyle: React.CSSProperties = {
    border: 'none',
    width: '200%',
    height: '200%',
    transform: 'scale(0.5)',
    transformOrigin: 'top left',
    pointerEvents: 'none',
  }

  function renderContent() {
    switch (displayIndex) {
      case 0:
        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div className="grid grid-cols-2 gap-2 w-full max-w-[740px]">
              {phProducts.map((product, i) => {
                const loaded = i < visibleCount
                return (
                  <div
                    key={product.slug}
                    className="relative flex items-center gap-3 rounded-[14px] px-4 py-3 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,237,213,0.7)',
                      minHeight: 64,
                    }}
                  >
                    {!loaded ? (
                      <>
                        <DotGridCard />
                        <span
                          className="relative z-10 font-jakarta font-black text-sm w-7 text-center shrink-0"
                          style={{ color: 'rgba(156,63,0,0.38)' }}
                        >
                          #{i + 1}
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          className="font-jakarta font-black text-sm w-7 text-center shrink-0"
                          style={{ color: 'rgba(156,63,0,0.35)', animation: 'fadeUp 0.35s ease both' }}
                        >
                          #{i + 1}
                        </span>
                        <img
                          src={product.logo}
                          alt={product.name}
                          className="w-10 h-10 rounded-[8px] border border-white/60 shrink-0"
                          style={{ objectFit: 'contain', background: '#fff', animation: 'fadeUp 0.35s ease both' }}
                        />
                        <div className="flex-1 min-w-0 flex flex-col gap-1" style={{ animation: 'fadeUp 0.4s ease both 0.05s' }}>
                          <p className="font-jakarta font-black text-sm text-on-background truncate leading-tight">{product.name}</p>
                          <p className="text-[11px] font-bold truncate leading-tight" style={{ color: 'rgba(156,63,0,0.55)' }}>{product.category}</p>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="overflow-hidden h-full" style={{ pointerEvents: 'none', padding: '12px' }}>
            <div style={{ transform: 'scale(0.72)', transformOrigin: 'top left', width: '138.9%', pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {founders.slice(0, visibleCount).map(f => (
                <FounderCard key={f.name} founder={f} />
              ))}
            </div>
          </div>
        )
      case 2:
        return <VeloCommunityCard />
      case 3:
        return (
          <div className="overflow-hidden" style={{ height: '100%', pointerEvents: 'none' }}>
            <iframe
              src="/apex/velo-decode.html"
              sandbox="allow-scripts allow-same-origin"
              style={iframeStyle}
            />
          </div>
        )
      case 4:
        return (
          <div className="overflow-hidden" style={{ height: '100%', pointerEvents: 'none' }}>
            <iframe
              src="/apex/velo-microcourse.html"
              sandbox="allow-scripts allow-same-origin"
              style={iframeStyle}
            />
          </div>
        )
      case 5:
        return (
          <div className="overflow-hidden" style={{ height: '100%', pointerEvents: 'none' }}>
            <iframe
              src="/gmail-flow/email-body.html"
              sandbox="allow-scripts allow-same-origin"
              style={iframeStyle}
            />
          </div>
        )
      default:
        return null
    }
  }

  const stepName = PHASES[displayIndex]?.name ?? ''

  return (
    <div className="relative h-full">
      <div className="h-full">
        {renderContent()}
      </div>

      {scanPhase === 'scanning' && displayIndex !== 0 && (
        <PhaseOverlay key={activePhaseIndex} stepName={stepName} />
      )}
    </div>
  )
}

export default function ApexScanOverlay() {
  const [scanPhase, setScanPhase]               = useState<ScanPhase>('scanning')
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [isExiting, setIsExiting]               = useState(false)
  const [visibleCount, setVisibleCount]         = useState(0)

  // Broadcast scan progress for SideNav indicator
  useEffect(() => {
    const progress = scanPhase === 'complete' ? 1 : activePhaseIndex / PHASES.length
    window.dispatchEvent(new CustomEvent('apex-scan-progress', { detail: { progress, phase: scanPhase } }))
  }, [scanPhase, activePhaseIndex])

  // Clear progress on unmount
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('apex-scan-progress', { detail: { progress: -1, phase: 'dismissed' } }))
    }
  }, [])

  // Advance through phases sequentially
  useEffect(() => {
    if (scanPhase !== 'scanning') return
    if (activePhaseIndex >= PHASES.length) {
      setScanPhase('complete')
      return
    }
    const duration = activePhaseIndex === 0 ? PHASE_0_DURATION_MS : PHASE_DURATION_MS
    const t = setTimeout(() => setActivePhaseIndex(i => i + 1), duration)
    return () => clearTimeout(t)
  }, [scanPhase, activePhaseIndex])

  // Progressive reveal for steps 0 (PH rows) and 1 (founder cards)
  useEffect(() => {
    setVisibleCount(0)
    if (scanPhase !== 'scanning') return
    if (activePhaseIndex !== 0 && activePhaseIndex !== 1) return

    const max = activePhaseIndex === 0 ? 10 : 3
    const intervalMs = activePhaseIndex === 0 ? PHASE_0_INTERVAL_MS : PHASE_DURATION_MS / max
    let count = 0
    let interval: ReturnType<typeof setInterval>
    const delay = activePhaseIndex === 0 ? PHASE_0_INITIAL_DELAY_MS : 0
    const t0 = setTimeout(() => {
      interval = setInterval(() => {
        count++
        setVisibleCount(count)
        if (count >= max) clearInterval(interval)
      }, intervalMs)
    }, delay)
    return () => { clearTimeout(t0); clearInterval(interval) }
  }, [activePhaseIndex, scanPhase])

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
  }, [])

  if (scanPhase === 'dismissed') return null

  return (
    <div
      className="fixed top-16 left-0 md:left-20 right-0 bottom-0 z-[45] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fffaf7 0%, #fff1e6 100%)',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />

      {/* Two-column layout */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-stretch gap-6 md:gap-12 max-w-6xl w-full px-4 md:px-16"
        style={{ height: 'calc(100vh - 128px)' }}
      >
        {/* Left: title + steps */}
        <div className="w-full md:w-[42%] flex flex-col justify-center gap-6 py-4 shrink-0">
          <h1 className="text-4xl font-black font-jakarta text-primary leading-tight">
            {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
          </h1>

          <div className="space-y-1 fade-up">
            {PHASES.map((p, i) => {
              const isActive   = i === activePhaseIndex
              const isComplete = i < activePhaseIndex || scanPhase === 'complete'
              const isWaiting  = !isActive && !isComplete
              return (
                <div
                  key={p.id}
                  className="flex items-start gap-4 transition-all duration-300 px-4 py-3 rounded-[14px]"
                  style={{
                    opacity: isWaiting ? 0.35 : 1,
                    ...(isActive ? {
                      background: 'rgba(255,122,47,0.07)',
                      border: '1px solid rgba(255,122,47,0.35)',
                      boxShadow: '0 0 24px rgba(255,122,47,0.12)',
                    } : {}),
                  }}
                >
                  {/* Icon pill */}
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)' }}
                  >
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                    >
                      {p.icon}
                    </span>
                  </div>

                  {/* Name + tool-call annotation */}
                  <div className="flex-1 min-w-0 pt-1">
                    <span className="text-on-background text-sm font-semibold leading-tight block">{p.name}</span>
                    {isActive && (
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: 'rgba(156,63,0,0.5)' }}>
                        ↳ running tool…
                      </p>
                    )}
                  </div>

                  {/* Status: bouncing dots or checkmark */}
                  {isActive && (
                    <div className="flex items-center gap-1 mt-2 shrink-0">
                      {[0, 1, 2].map(j => (
                        <div
                          key={j}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#ff7a2f',
                            animation: `dotBounce 1.2s ease-in-out ${j * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {isComplete && (
                    <span
                      className="material-symbols-outlined shrink-0 mt-0.5"
                      style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
                    >
                      check_circle
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <button
            onClick={handleDismiss}
            className="self-start font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 122, 47, 0.3)',
              boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              color: '#7a2e00',
            }}
          >
            {scanPhase === 'complete' ? 'See results' : 'Stop'}
          </button>
        </div>

        {/* Right: output preview panel */}
        <div className="flex-1 min-h-0 py-4">
          <StepPreview
            activePhaseIndex={activePhaseIndex}
            scanPhase={scanPhase}
            visibleCount={visibleCount}
          />
        </div>
      </div>
    </div>
  )
}
