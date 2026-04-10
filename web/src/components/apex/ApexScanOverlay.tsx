'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

type ScanPhase = 'idle' | 'scanning' | 'complete' | 'dismissed'

const PHASES = [
  { id: 1, name: 'Scanning Product Hunt top 10', icon: 'travel_explore' },
  { id: 2, name: 'Enriching founder profiles',   icon: 'person_search'  },
  { id: 3, name: 'Running Decode skill',          icon: 'psychology'     },
  { id: 4, name: 'Running Rapid Course skill',    icon: 'bolt'           },
  { id: 5, name: 'Drafting outreach messages',    icon: 'edit_note'      },
] as const

const PHASE_DURATION_MS  = 1800
const COMPLETE_HOLD_MS   = 2000
const FADE_DURATION_MS   = 600

export default function ApexScanOverlay() {
  const [scanPhase, setScanPhase]           = useState<ScanPhase>('idle')
  const [activePhaseIndex, setActivePhaseIndex] = useState(-1)
  const [isExiting, setIsExiting]           = useState(false)

  // Lock body scroll while overlay is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Advance through phases sequentially
  useEffect(() => {
    if (scanPhase !== 'scanning' || activePhaseIndex < 0) return

    if (activePhaseIndex >= PHASES.length) {
      setScanPhase('complete')
      const t = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
      }, COMPLETE_HOLD_MS)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setActivePhaseIndex(i => i + 1), PHASE_DURATION_MS)
    return () => clearTimeout(t)
  }, [scanPhase, activePhaseIndex])

  const handleRunApex = useCallback(() => {
    setScanPhase('scanning')
    setActivePhaseIndex(0)
  }, [])

  const handleStop = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
  }, [])

  if (scanPhase === 'dismissed') return null

  const sparkleClass =
    scanPhase === 'scanning' ? 'animate-apex-pulse' :
    scanPhase === 'complete' ? 'animate-apex-pop'   : ''

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 50%, #6b2200 100%)',
        opacity: isExiting ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease`,
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Two-column layout */}
      <div className="relative z-10 flex items-center gap-20 max-w-4xl w-full px-12">

        {/* Left: Apex sparkle icon */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className={`relative flex items-center justify-center ${sparkleClass}`}>
            <div
              className="absolute w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
            />
            <span
              className="material-symbols-outlined text-white relative"
              style={{ fontSize: '160px', lineHeight: '1', fontVariationSettings: "'FILL' 1, 'wght' 700" }}
            >
              auto_awesome
            </span>
          </div>
          <span className="text-white font-jakarta font-black text-lg tracking-wide">Apex</span>
        </div>

        {/* Right: Content */}
        <div className="flex-1">

          {/* Idle state */}
          {scanPhase === 'idle' && (
            <div>
              <h1 className="text-4xl font-black font-jakarta text-white leading-tight mb-3">
                Ready to run Apex?
              </h1>
              <p className="text-white/80 text-base mb-8">
                Apex will scan Product Hunt, enrich founder profiles, and draft your outreach.
              </p>
              <button
                onClick={handleRunApex}
                className="bg-white/95 text-primary font-extrabold font-jakarta px-8 py-3.5 rounded-full text-base shadow-xl hover:bg-white active:scale-95 transition-all border border-white"
              >
                Run Apex
              </button>
            </div>
          )}

          {/* Scanning / Complete state */}
          {(scanPhase === 'scanning' || scanPhase === 'complete') && (
            <div>
              <h1 className="text-4xl font-black font-jakarta text-white leading-tight mb-6">
                {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
              </h1>
              <div className="space-y-3 fade-up">
                {PHASES.map((p, i) => {
                  const isActive   = i === activePhaseIndex
                  const isComplete = i < activePhaseIndex || scanPhase === 'complete'
                  const isWaiting  = !isActive && !isComplete
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center gap-4 transition-opacity duration-300 ${isWaiting ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {/* Icon pill */}
                      <div
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.2)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-white"
                          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                        >
                          {p.icon}
                        </span>
                      </div>

                      {/* Phase name */}
                      <span className="text-white text-sm font-semibold flex-1">{p.name}</span>

                      {/* Status: spinner or checkmark */}
                      {isActive && (
                        <div
                          className="w-4 h-4 rounded-full border-2 animate-spin shrink-0"
                          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'rgba(255,255,255,1)' }}
                        />
                      )}
                      {isComplete && (
                        <span
                          className="material-symbols-outlined text-white shrink-0"
                          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stop button — only during active scan */}
      {scanPhase === 'scanning' && (
        <button
          onClick={handleStop}
          className="absolute bottom-8 right-8 text-white/80 hover:text-white text-sm font-semibold border border-white/30 hover:border-white/60 px-5 py-2 rounded-full transition-all"
        >
          Stop
        </button>
      )}
    </div>,
    document.body
  )
}
