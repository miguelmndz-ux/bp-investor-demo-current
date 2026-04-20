'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { phProducts } from '@/lib/fixtures/products'
import { useIsMobile } from '@/hooks/useIsMobile'

type ScanPhase = 'scanning' | 'complete' | 'dismissed'

const PHASES = [
  { id: 1, name: 'Scanning Product Hunt top 10',    icon: 'travel_explore' },
  { id: 2, name: 'Enriching founder profiles',       icon: 'person_search'  },
  { id: 3, name: 'Creating community profile pages', icon: 'group'          },
  { id: 4, name: 'Running Decode and Course skills', icon: 'psychology'     },
  { id: 5, name: 'Drafting outreach messages',       icon: 'edit_note'      },
] as const

const PHASE_DURATION_MS   = 8000
const PHASE_0_DURATION_MS = 24000
const PHASE_1_DURATION_MS = 24000
const PHASE_2_DURATION_MS = 14000
const PHASE_3_DURATION_MS = 14000
const PHASE_0_INTERVAL_MS = 2000
const FADE_DURATION_MS    = 600

// Per-step reveal config: intervalMs is between cards; delayMs is before first card
const REVEAL_CONFIGS: Record<number, { max: number; intervalMs: number; delayMs: number }> = {
  0: { max: 10, intervalMs: PHASE_0_INTERVAL_MS,   delayMs: 1500 },
  1: { max: 10, intervalMs: 2000,                  delayMs: 0    },
  2: { max: 5,  intervalMs: 2000,                  delayMs: 0    },
  3: { max: 2,  intervalMs: 4000,                  delayMs: 0    },
  4: { max: 1,  intervalMs: 100,                   delayMs: 3000 },
}

const MICROSTEPS: Record<number, string[]> = {
  0: [
    'Fetching Product Hunt leaderboard',
    'Filtering top 10 by engagement',
  ],
  1: [
    'Resolving founder identities',
    'Scoring founder–community fit',
  ],
  2: [
    'Analyzing product positioning',
    'Generating community taglines',
    'Building topic taxonomy',
    'Publishing profile pages',
  ],
  3: [
    'Running Decode skill on Velo',
    'Extracting key product insights',
    'Generating course outline',
    'Publishing Decode and Course previews',
  ],
  4: [
    'Drafting personalized subject line',
    'Finalizing and queuing for send',
  ],
}

const CARD_BASE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,237,213,0.7)',
  borderRadius: 14,
}

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

    const PIX  = 4
    const STEP = 6
    const cols = Math.floor(w / STEP)
    const rows = Math.floor(h / STEP)

    interface Pix {
      x: number; y: number
      diagNorm: number
      rand: number
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
        let dist = Math.abs(px.diagNorm - wavePos)
        dist = Math.min(dist, 1 - dist)
        const wave = Math.max(0, 1 - dist / WAVE_WIDTH)

        const shimmer = (Math.sin(t * 0.65 + px.shimmerPhase) + 1) * 0.5 * 0.1

        const sparkSignal = Math.sin(t * (0.8 + px.rand * 1.1) + px.shimmerPhase * 2.7)
        const spark = sparkSignal > 0.9 ? ((sparkSignal - 0.9) / 0.1) * 0.12 : 0

        const intensity = shimmer + wave * 0.5 + spark
        if (intensity < 0.02) continue

        const capped = Math.min(1, intensity)
        const ch = Math.round(160 - 20 * capped)
        const a = Math.min(0.22, 0.03 + intensity * 0.19)

        ctx.fillStyle = `rgba(${ch},${ch},${ch},${a.toFixed(2)})`
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

function OutreachEmailCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.8)',
      border: '1px solid rgba(255,255,255,0.5)',
      boxShadow: '0 20px 40px rgba(163,56,0,0.08)',
      borderRadius: 24,
      overflow: 'hidden',
    }}>
      {/* Hero card */}
      <div style={{
        background: 'linear-gradient(135deg, #fffcf0 0%, #fff2e0 40%, #ffe8d1 70%, #fff7ed 100%)',
        margin: 16,
        borderRadius: 16,
        padding: '18px 18px 14px',
        boxShadow: '0 8px 24px -4px rgba(255,107,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', flexShrink: 0 }}>
              <img
                src="https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png"
                alt="Velo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: '#1a0a00', letterSpacing: '-0.04em', lineHeight: 1.1 }}>Velo</div>
              <div style={{ fontSize: 11, color: '#9f6c47', fontWeight: 600, marginTop: 2 }}>Async Video AI</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(163,56,0,0.2)', borderRadius: 10, padding: '5px 10px', background: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
            <span style={{ fontSize: 17, fontWeight: 900, color: '#9c3f00', lineHeight: 1 }}>#1</span>
            <span style={{ fontSize: 7, fontWeight: 700, color: '#9c3f00', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginTop: 2, lineHeight: 1.3 }}>Product<br />Hunt</span>
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 900, color: '#1a0a00', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 10 }}>
          BuildParty decoded Velo.<br />
          <span style={{ color: '#a33800' }}>Here&apos;s what we built:</span>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const, marginBottom: 12 }}>
          {['Live Launch Session', 'Velo Decoded', 'Velo Course'].map(label => (
            <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.85)', borderRadius: 9999, boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#7a2e00', whiteSpace: 'nowrap' as const }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#7a4a28', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          Demo your product live to a room of AI builders who ask questions and go hands-on.
        </p>
      </div>
      {/* Decode + Course thumbnails */}
      <div style={{ margin: '0 16px 16px', background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(230,220,210,0.5)', boxShadow: '0 4px 20px rgba(163,56,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 8 }}>
          {['/apex/decode-preview.png', '/apex/course-preview.png'].map((src, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src={src} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StepPreviewProps {
  phaseIndex: number
  visibleCount: number
  isMobile: boolean
}

function StepPreview({ phaseIndex, visibleCount, isMobile }: StepPreviewProps) {
  const displayIndex = Math.min(phaseIndex, PHASES.length - 1)

  function renderContent() {
    switch (displayIndex) {

      // ── Step 1: PH top 10 ──────────────────────────────────────────────
      case 0:
        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full max-w-[740px]">
              {phProducts.map((product, i) => {
                const loaded = i < visibleCount
                return (
                  <div
                    key={product.slug}
                    className={`relative flex items-center gap-2 overflow-hidden px-4 py-3`}
                    style={{ ...CARD_BASE, minHeight: 64 }}
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

      // ── Step 2: Founder profiles ───────────────────────────────────────
      case 1: {
        // One entry per product, matched to phProducts order
        const founderCards = [
          { key: 'velo',              name: 'Ajay Kumar',       role: 'Co-founder, Velo',             avatar: 'https://ph-avatars.imgix.net/5672627/e909456b-451a-4305-a963-a7bae3bba563.jpeg' },
          { key: 'chrome-vertical-tabs', name: 'Michael X. Liu', role: 'Creator, Chrome Vertical Tabs', avatar: 'https://avatars.githubusercontent.com/lxieyang' },
          { key: 'flint',             name: 'Michelle Lim',     role: 'Co-founder, Flint',            avatar: 'https://ph-avatars.imgix.net/3569751/original.jpeg' },
          { key: 'lookaway-2',        name: 'Kushagra Agarwal', role: 'Maker, LookAway 2',            avatar: 'https://ph-avatars.imgix.net/245831/original.jpeg' },
          { key: 'mindsdb-anton',     name: 'Jorge Torres',     role: 'Co-founder & CEO, MindsDB',    avatar: 'https://ph-avatars.imgix.net/1630350/f356f703-e7f0-42fb-be4d-14712e6b2db6.png' },
          { key: 'browser-arena',     name: 'Andrea Pinto',     role: 'Founder & CEO, Notte',         avatar: 'https://ph-avatars.imgix.net/6365170/e1d24e85-e471-467e-9b5c-7ab806e951de.jpeg' },
          { key: 'career-ops-on-claude', name: 'Santiago Fernández', role: 'Maker, Career-Ops',      avatar: 'https://avatars.githubusercontent.com/santifer' },
          { key: 'keeby',             name: 'Adrian Abelarde',  role: 'Maker, Keeby',                 avatar: 'https://avatars.githubusercontent.com/drianlarde' },
          { key: 'passport-reader',   name: 'Iris Development', role: 'Founder, PassportReader',      avatar: phProducts[8].logo },
          { key: 'featdrop',          name: 'Allan Jiang',      role: 'Maker, FeatDrop (YC W22)',     avatar: 'https://ph-avatars.imgix.net/14905/f705e2c7-3fa4-41de-9ce9-e819a70658c6.jpeg' },
        ]
        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full max-w-[740px]">
              {founderCards.map((f, i) => {
                const loaded = i < visibleCount
                return (
                  <div
                    key={f.key}
                    className={`relative flex items-center gap-2 overflow-hidden px-4 py-3`}
                    style={{ ...CARD_BASE, minHeight: 64 }}
                  >
                    {!loaded ? (
                      <>
                        <DotGridCard />
                        <div
                          className="relative z-10 w-8 h-8 rounded-full shrink-0"
                          style={{ background: 'rgba(160,160,160,0.12)' }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                          style={{ border: '1.5px solid rgba(255,237,213,0.9)', animation: 'fadeUp 0.35s ease both' }}
                        />
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5" style={{ animation: 'fadeUp 0.4s ease both 0.05s' }}>
                          <p className="font-jakarta font-black text-sm text-on-background truncate leading-tight">{f.name}</p>
                          <p className="text-[11px] font-bold truncate leading-tight" style={{ color: 'rgba(156,63,0,0.55)' }}>{f.role}</p>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      // ── Step 3: Community profile pages ───────────────────────────────
      case 2: {
        const communityData = [
          {
            product: phProducts[0],
            members: '1.2k',
            tags: ['Video AI', 'Async', 'Remote Teams'],
            tagline: phProducts[0].tagline ?? 'AI-powered async video with instant transcription and smart summaries.',
          },
          {
            product: phProducts[1],
            members: '800',
            tags: ['Browser', 'Productivity', 'Chrome'],
            tagline: 'Organize your tabs vertically for faster, cleaner browsing in Chrome.',
          },
          {
            product: phProducts[2],
            members: '600',
            tags: ['Landing Pages', 'AI', 'Marketing'],
            tagline: 'Build campaign landing pages in minutes with AI — no designer needed.',
          },
          {
            product: phProducts[3],
            members: '420',
            tags: ['Eye Health', 'Mac', 'Wellness'],
            tagline: 'Smart break reminders that protect your eyes during long Mac sessions.',
          },
          {
            product: phProducts[4],
            members: '280',
            tags: ['BI', 'AI Agent', 'Data'],
            tagline: 'Autonomous BI agent that answers data questions and acts on them.',
          },
          {
            product: phProducts[5],
            members: '190',
            tags: ['Browser', 'AI', 'Automation'],
            tagline: 'AI-native browser that lets agents browse the web like a human.',
          },
        ]
        if (isMobile) {
          return (
            <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
              <div className="grid grid-cols-2 gap-1.5 w-full">
                {communityData.slice(0, 6).map(({ product, members, tagline }, i) => {
                  const loaded = i < visibleCount
                  return (
                    <div
                      key={product.slug}
                      className="relative overflow-hidden"
                      style={{ ...CARD_BASE, minHeight: 96 }}
                    >
                      {!loaded ? (
                        <>
                          <DotGridCard />
                          <div className="relative z-10 flex flex-col gap-1.5 px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-[6px] shrink-0" style={{ background: 'rgba(160,160,160,0.12)' }} />
                              <div className="flex flex-col gap-1 flex-1">
                                <div className="h-2.5 rounded-full w-14" style={{ background: 'rgba(160,160,160,0.15)' }} />
                                <div className="h-2 rounded-full w-10" style={{ background: 'rgba(160,160,160,0.10)' }} />
                              </div>
                            </div>
                            <div className="h-2 rounded-full w-full" style={{ background: 'rgba(160,160,160,0.08)' }} />
                            <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(160,160,160,0.06)' }} />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-1 px-3 py-2.5" style={{ animation: 'fadeUp 0.35s ease both' }}>
                          <div className="flex items-center gap-2">
                            <img
                              src={product.logo}
                              alt={product.name}
                              className="w-6 h-6 rounded-[6px] shrink-0"
                              style={{ objectFit: 'contain', background: '#fff', border: '1px solid rgba(255,237,213,0.9)' }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-jakarta font-black text-[12px] text-on-background truncate leading-tight">{product.name}</p>
                              <p className="text-[10px] font-bold truncate" style={{ color: 'rgba(156,63,0,0.55)' }}>{product.category}</p>
                            </div>
                          </div>
                          <p className="text-[10px] text-stone-500 leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {tagline}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold" style={{ color: 'rgba(156,63,0,0.6)' }}>↑ {product.votes}</span>
                            <span className="text-[10px] font-bold" style={{ color: 'rgba(156,63,0,0.6)' }}>{members} members</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }

        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div className="flex flex-col gap-1.5 md:gap-2 w-full max-w-[420px]">
              {communityData.map(({ product, members, tags, tagline }, i) => {
                const loaded = i < visibleCount
                return (
                  <div
                    key={product.slug}
                    className="relative overflow-hidden"
                    style={{ ...CARD_BASE, minHeight: 100 }}
                  >
                    {!loaded ? (
                      <>
                        <DotGridCard />
                        <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                          <div
                            className="w-8 h-8 rounded-[8px] shrink-0"
                            style={{ background: 'rgba(160,160,160,0.12)' }}
                          />
                          <div className="flex flex-col gap-1.5 flex-1">
                            <div className="h-3 rounded-full w-32" style={{ background: 'rgba(160,160,160,0.15)' }} />
                            <div className="h-2.5 rounded-full w-20" style={{ background: 'rgba(160,160,160,0.10)' }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-1.5 px-4 py-3" style={{ animation: 'fadeUp 0.35s ease both' }}>
                        <div className="flex items-center gap-2.5">
                          <img
                            src={product.logo}
                            alt={product.name}
                            className="w-8 h-8 rounded-[8px] shrink-0"
                            style={{ objectFit: 'contain', background: '#fff', border: '1px solid rgba(255,237,213,0.9)' }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-jakarta font-black text-sm text-on-background truncate leading-tight">{product.name}</p>
                            <p className="text-[11px] font-bold truncate" style={{ color: 'rgba(156,63,0,0.55)' }}>{product.category}</p>
                          </div>
                        </div>
                        <p
                          className="text-[11px] text-stone-500 leading-snug"
                          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', animation: 'fadeUp 0.4s ease both 0.05s' }}
                        >
                          {tagline}
                        </p>
                        <div className="flex items-center gap-2" style={{ animation: 'fadeUp 0.4s ease both 0.1s' }}>
                          <span className="text-[10px] font-bold" style={{ color: 'rgba(156,63,0,0.6)' }}>
                            ↑ {product.votes} votes
                          </span>
                          <span className="text-[10px] font-bold" style={{ color: 'rgba(156,63,0,0.6)' }}>
                            {members} members
                          </span>
                          {tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(255,122,47,0.1)', color: '#9c3f00' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      // ── Step 4: Decode + Course skills ────────────────────────────────
      case 3: {
        const previews = [
          { src: '/apex/decode-preview.png', alt: 'Velo Decoded' },
          { src: '/apex/course-preview.png', alt: 'Velo Course' },
        ]
        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div className="flex flex-col gap-2 md:gap-3 w-full md:max-w-[520px]">
              {previews.map(({ src, alt }, i) => {
                const loaded = i < visibleCount
                return (
                  <div
                    key={src}
                    className="relative overflow-hidden"
                    style={{ ...CARD_BASE, aspectRatio: '900 / 390' }}
                  >
                    {!loaded ? (
                      <DotGridCard />
                    ) : (
                      <img
                        src={src}
                        alt={alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          display: 'block',
                          animation: 'fadeUp 0.4s ease both',
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      // ── Step 5: Outreach email ─────────────────────────────────────────
      case 4: {
        const loaded = visibleCount >= 1
        return (
          <div className="h-full flex flex-col justify-center items-center" style={{ pointerEvents: 'none' }}>
            <div style={{ width: '100%', maxWidth: 480 }}>
              {!loaded ? (
                <div className="relative overflow-hidden" style={{ ...CARD_BASE, minHeight: 300 }}>
                  <DotGridCard />
                </div>
              ) : (
                <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                  <OutreachEmailCard />
                </div>
              )}
            </div>
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <div className="relative h-full">
      <div className="h-full">
        {renderContent()}
      </div>
    </div>
  )
}

export default function ApexScanOverlay() {
  const [scanPhase, setScanPhase]               = useState<ScanPhase>('scanning')
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [isExiting, setIsExiting]               = useState(false)
  // Track both which phase owns the count so stale counts never bleed into a new step's first render
  const [revealState, setRevealState]           = useState<{ phase: number; count: number }>({ phase: -1, count: 0 })
  const visibleCount = revealState.phase === activePhaseIndex ? revealState.count : 0
  const isMobile                                = useIsMobile()
  const [visibleMicrosteps, setVisibleMicrosteps]   = useState(0)
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null)

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
    const duration =
      activePhaseIndex === 0 ? PHASE_0_DURATION_MS :
      activePhaseIndex === 1 ? PHASE_1_DURATION_MS :
      activePhaseIndex === 2 ? PHASE_2_DURATION_MS :
      activePhaseIndex === 3 ? PHASE_3_DURATION_MS :
      PHASE_DURATION_MS
    const t = setTimeout(() => setActivePhaseIndex(i => i + 1), duration)
    return () => clearTimeout(t)
  }, [scanPhase, activePhaseIndex])

  // Progressive reveal — driven by REVEAL_CONFIGS
  useEffect(() => {
    const phase = activePhaseIndex
    setRevealState({ phase, count: 0 })
    if (scanPhase !== 'scanning') return

    const cfg = REVEAL_CONFIGS[phase]
    if (!cfg) return

    let count = 0
    let interval: ReturnType<typeof setInterval>

    const t0 = setTimeout(() => {
      interval = setInterval(() => {
        count++
        setRevealState({ phase, count })
        if (count >= cfg.max) clearInterval(interval)
      }, cfg.intervalMs)
    }, cfg.delayMs)

    return () => { clearTimeout(t0); clearInterval(interval) }
  }, [activePhaseIndex, scanPhase])

  // Reveal microsteps progressively during each active phase
  useEffect(() => {
    setVisibleMicrosteps(0)
    if (scanPhase !== 'scanning') return
    const steps = MICROSTEPS[activePhaseIndex]
    if (!steps?.length) return
    const intervalMs = [3500, 3500, 2500, 2500, 1800][activePhaseIndex] ?? 2000
    let count = 0
    const t = setInterval(() => {
      count++
      setVisibleMicrosteps(count)
      if (count >= steps.length) clearInterval(t)
    }, intervalMs)
    return () => clearInterval(t)
  }, [activePhaseIndex, scanPhase])

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => setScanPhase('dismissed'), FADE_DURATION_MS)
  }, [])

  if (scanPhase === 'dismissed') return null

  const overlayStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #fffaf7 0%, #fff1e6 100%)',
    opacity: isExiting ? 0 : 1,
    transition: `opacity ${FADE_DURATION_MS}ms ease`,
  }

  const liquidGlass: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 122, 47, 0.3)',
    boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
    color: '#7a2e00',
  }

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    const mobileStep = (p: (typeof PHASES)[number], i: number, isActive: boolean, isComplete: boolean, isSelected: boolean) => (
      <div
        key={p.id}
        className="transition-all duration-300 px-3 py-2 rounded-[14px]"
        style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr auto',
          columnGap: 12,
          alignItems: 'center',
          opacity: (!isActive && !isComplete) ? 0.35 : 1,
          cursor: scanPhase === 'complete' ? 'pointer' : 'default',
          ...(isActive || isSelected ? {
            background: 'rgba(255,122,47,0.07)',
            border: '1px solid rgba(255,122,47,0.35)',
            boxShadow: '0 0 24px rgba(255,122,47,0.12)',
          } : {}),
        }}
        onClick={() => { if (scanPhase === 'complete') setSelectedPhaseIndex(isSelected ? null : i) }}
      >
        <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)' }}>
          <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
        </div>
        <span className="text-on-background text-[14px] font-bold leading-tight">{p.name}</span>
        <div>
          {isActive && (
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="rgba(255,122,47,0.15)" strokeWidth="2" />
              <path d="M10 3 A7 7 0 0 1 17 10" stroke="#ff7a2f" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {isComplete && (
            <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}>check_circle</span>
          )}
        </div>
      </div>
    )

    return (
      <div className="fixed top-16 left-0 right-0 bottom-0 z-[45] overflow-hidden" style={overlayStyle}>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col w-full h-full px-4 pt-4 pb-20">
          {/* Centered content group — title + preview + step pulled together */}
          <div className="flex-1 flex flex-col justify-center gap-9">
            {/* Title */}
            <h1 className="text-2xl font-black font-jakarta text-primary text-center leading-tight shrink-0">
              {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
            </h1>

            {/* Preview — active step during scan; selected step when complete */}
            {(scanPhase === 'scanning' || selectedPhaseIndex !== null) && (
              <div className="min-h-0 overflow-hidden" style={{ maxHeight: '45vh' }}>
                <StepPreview
                  phaseIndex={scanPhase === 'complete' ? (selectedPhaseIndex ?? 0) : activePhaseIndex}
                  visibleCount={scanPhase === 'complete' ? 999 : visibleCount}
                  isMobile={true}
                />
              </div>
            )}

            {/* Step list */}
            {scanPhase === 'scanning' && activePhaseIndex < PHASES.length ? (
              <div className="shrink-0 max-w-sm mx-auto w-full">
                {mobileStep(PHASES[activePhaseIndex], activePhaseIndex, true, false, false)}
              </div>
            ) : selectedPhaseIndex !== null ? (
              <div className="shrink-0 space-y-1 max-w-sm mx-auto w-full">
                {PHASES.map((p, i) => mobileStep(p, i, false, true, selectedPhaseIndex === i))}
              </div>
            ) : (
              <div className="shrink-0 space-y-1 max-w-sm mx-auto w-full">
                {PHASES.map((p, i) => mobileStep(p, i, false, true, false))}
              </div>
            )}
          </div>

          {/* Button pinned to bottom */}
          <button
            onClick={handleDismiss}
            className="shrink-0 w-full font-jakarta font-bold text-base rounded-full px-8 py-4 transition-all duration-300 active:scale-95"
            style={liquidGlass}
          >
            {scanPhase === 'complete' ? 'See results' : 'Stop'}
          </button>
        </div>
      </div>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div
      className="fixed top-16 left-20 right-0 bottom-0 z-[45] flex items-center justify-center overflow-hidden"
      style={overlayStyle}
    >
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />

      <div
        className="relative z-10 flex flex-row items-stretch gap-12 max-w-6xl w-full px-16"
        style={{ height: 'calc(100vh - 128px)', overflow: 'hidden' }}
      >
        {/* Left: title + steps + button */}
        <div className="w-[42%] flex flex-col justify-center gap-6 py-4 shrink-0">
          <h1 className="text-4xl font-black font-jakarta text-primary leading-tight pl-4">
            {scanPhase === 'complete' ? 'Apex run complete.' : 'Apex is running\u2026'}
          </h1>

          <div className="space-y-1 fade-up">
            {PHASES.map((p, i) => {
              const isActive   = i === activePhaseIndex && scanPhase === 'scanning'
              const isComplete = i < activePhaseIndex || scanPhase === 'complete'
              const isWaiting  = !isActive && !isComplete
              const isSelected = scanPhase === 'complete' && selectedPhaseIndex === i
              const microsteps = (MICROSTEPS[i] ?? []).slice(0, visibleMicrosteps)
              return (
                <div
                  key={p.id}
                  className="transition-all duration-300 px-4 py-3 rounded-[14px]"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr auto',
                    columnGap: 16,
                    alignItems: 'center',
                    opacity: isWaiting ? 0.35 : 1,
                    cursor: scanPhase === 'complete' ? 'pointer' : 'default',
                    ...(isActive || isSelected ? {
                      background: 'rgba(255,122,47,0.07)',
                      border: '1px solid rgba(255,122,47,0.35)',
                      boxShadow: '0 0 24px rgba(255,122,47,0.12)',
                    } : {}),
                  }}
                  onClick={() => { if (scanPhase === 'complete') setSelectedPhaseIndex(i) }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)', alignSelf: 'center' }}
                  >
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                      {p.icon}
                    </span>
                  </div>

                  <span className="text-on-background text-[15px] font-bold leading-tight" style={{ alignSelf: 'center' }}>
                    {p.name}
                  </span>

                  <div style={{ alignSelf: 'center' }}>
                    {isActive && (
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="10" cy="10" r="7" stroke="rgba(255,122,47,0.15)" strokeWidth="2" />
                        <path d="M10 3 A7 7 0 0 1 17 10" stroke="#ff7a2f" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {isComplete && (
                      <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}>
                        check_circle
                      </span>
                    )}
                  </div>

                  {isActive && microsteps.length > 0 && (
                    <div style={{ gridColumn: '2 / 3', marginTop: -10, paddingBottom: 4 }}>
                      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" style={{ display: 'block' }}>
                        <line x1="5" y1="0" x2="5" y2="4" stroke="rgba(156,63,0,0.6)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {microsteps.map((step, j) => {
                          const isLast = j === microsteps.length - 1
                          return (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 5, animation: 'fadeUp 0.3s ease both' }}>
                              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" style={{ flexShrink: 0 }}>
                                <line x1="5" y1="0" x2="5" y2="9" stroke="rgba(156,63,0,0.6)" strokeWidth="2" strokeLinecap="round" />
                                {!isLast && <line x1="5" y1="11" x2="5" y2="22" stroke="rgba(156,63,0,0.6)" strokeWidth="2" strokeLinecap="round" />}
                                <path d="M5 9 Q5 11 7 11 L15 11" stroke="rgba(156,63,0,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
                                <polyline points="12.5,8.5 15,11 12.5,13.5" stroke="rgba(156,63,0,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              </svg>
                              <span style={{ fontSize: 11, color: 'rgba(156,63,0,0.6)', fontWeight: 600 }}>{step}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button
            onClick={handleDismiss}
            className="self-start font-jakarta font-bold text-sm rounded-full px-8 py-3 transition-all duration-300 active:scale-95"
            style={liquidGlass}
          >
            {scanPhase === 'complete' ? 'See results' : 'Stop'}
          </button>
        </div>

        {/* Right: output preview */}
        <div className="flex-1 min-h-0 py-4">
          <StepPreview
            phaseIndex={scanPhase === 'complete' ? (selectedPhaseIndex ?? PHASES.length - 1) : activePhaseIndex}
            visibleCount={scanPhase === 'complete' ? 999 : visibleCount}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  )
}
