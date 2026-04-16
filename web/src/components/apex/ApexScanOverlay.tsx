'use client'

import { useState, useEffect, useCallback } from 'react'

type ScanPhase = 'scanning' | 'complete' | 'dismissed'

const PHASES = [
  { id: 1, name: 'Scanning Product Hunt top 10',      icon: 'travel_explore' },
  { id: 2, name: 'Enriching founder profiles',         icon: 'person_search'  },
  { id: 3, name: 'Creating community profile pages',   icon: 'group'          },
  { id: 4, name: 'Running Decode skill',               icon: 'psychology'     },
  { id: 5, name: 'Running Rapid Course skill',         icon: 'bolt'           },
  { id: 6, name: 'Drafting outreach messages',         icon: 'edit_note'      },
] as const

const PHASE_DURATION_MS  = 3500
const FADE_DURATION_MS   = 600

export default function ApexScanOverlay() {
  const [scanPhase, setScanPhase]           = useState<ScanPhase>('scanning')
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [isExiting, setIsExiting]           = useState(false)

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

    const t = setTimeout(() => setActivePhaseIndex(i => i + 1), PHASE_DURATION_MS)
    return () => clearTimeout(t)
  }, [scanPhase, activePhaseIndex])

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
  }, [])

  if (scanPhase === 'dismissed') return null

  const sparkleClass =
    scanPhase === 'scanning' ? 'animate-apex-pulse' :
    scanPhase === 'complete' ? 'animate-apex-pop'   : 'animate-apex-pulse'

  return (
    <div
      className="fixed top-16 left-20 right-0 bottom-0 z-[45] flex items-center justify-center"
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
      <div className="relative z-10 flex items-center gap-36 max-w-5xl w-full px-16">

        {/* Left: Apex sparkle icon */}
        <div className="flex items-center justify-center shrink-0">
          <div className={`relative flex items-center justify-center ${sparkleClass}`}>
            <div
              className="absolute w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,122,47,0.12) 0%, transparent 70%)' }}
            />
            <span
              className="material-symbols-outlined relative"
              style={{
                fontSize: '220px',
                lineHeight: '1',
                fontVariationSettings: "'FILL' 1, 'wght' 700",
                background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 50%, #6b2200 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              auto_awesome
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">

          {/* Scanning / Complete state */}
          {(scanPhase === 'scanning' || scanPhase === 'complete') && (
            <div>
              <h1 className="text-4xl font-black font-jakarta text-primary leading-tight mb-10">
                {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
              </h1>
              <div className="space-y-4 fade-up">
                {PHASES.map((p, i) => {
                  const isActive   = i === activePhaseIndex
                  const isComplete = i < activePhaseIndex || scanPhase === 'complete'
                  const isWaiting  = !isActive && !isComplete
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center gap-5 transition-opacity duration-300 ${isWaiting ? 'opacity-40' : 'opacity-100'}`}
                    >
                      {/* Icon pill */}
                      <div
                        className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)',
                          border: '1px solid rgba(255,122,47,0.3)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-white"
                          style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}
                        >
                          {p.icon}
                        </span>
                      </div>

                      {/* Phase name */}
                      <span className="text-on-background text-xl font-semibold flex-1">{p.name}</span>

                      {/* Status: spinner or checkmark */}
                      {isActive && (
                        <div
                          className="w-6 h-6 rounded-full border-2 animate-spin shrink-0"
                          style={{ borderColor: 'rgba(255,122,47,0.3)', borderTopColor: '#ff7a2f' }}
                        />
                      )}
                      {isComplete && (
                        <span
                          className="material-symbols-outlined shrink-0"
                          style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
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
                className="mt-14 font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95"
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
          )}
        </div>
      </div>

    </div>
  )
}
