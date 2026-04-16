'use client'

import { useRouter } from 'next/navigation'

const FEATURE_ITEMS = [
  { icon: 'smart_toy', label: 'Browser Agent' },
  { icon: 'face', label: 'AI Avatar Demo' },
  { icon: 'construction', label: 'Builder Challenge' },
  { icon: 'video_library', label: 'Recap' },
]

const DECODE_ITEMS = [
  { icon: 'account_tree', label: 'AI Pipeline' },
  { icon: 'smart_toy', label: 'Browser Agent' },
  { icon: 'face_retouching_natural', label: 'Avatar Synthesis' },
]

const COURSE_ITEMS = [
  { icon: 'videocam', label: 'Demo Capture' },
  { icon: 'auto_fix_high', label: 'Avatar Setup' },
  { icon: 'send', label: 'Share & Ship' },
]

const AI_TEAM = [
  {
    name: 'Nova',
    role: 'AI Host',
    desc: 'Nova runs the live session — managing the flow, fielding questions, and keeping the builder audience engaged throughout.',
    icon: 'mic',
    color: '#2563eb',
    bg: '#dbeafe',
    aura: 'rgba(147,197,253,0.25)',
  },
  {
    name: 'Echo',
    role: 'Session Memory',
    desc: 'Echo captures every insight from the session, generating searchable notes and highlight clips automatically.',
    icon: 'psychology',
    color: '#059669',
    bg: '#d1fae5',
    aura: 'rgba(110,231,183,0.25)',
  },
  {
    name: 'Apex',
    role: 'Launch Agent',
    desc: 'Apex amplifies the broadcast across Product Hunt and builder communities, tracking reach and viral engagement in real time.',
    icon: 'bolt',
    color: '#c2780a',
    bg: '#fef3c7',
    aura: 'rgba(251,191,36,0.25)',
  },
]

const CHECKLIST = [
  { text: 'Pick a time from the availability window', done: true },
  { text: 'Show up 5 mins early for AI calibration', done: false },
  { text: 'Prepare your local demo environment', done: false },
]

export default function WhatToExpectPage() {
  const router = useRouter()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #ffffff 0%, #fff6ef 100%)',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* Floating background orbs */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, pointerEvents: 'none', zIndex: 0,
          width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(255,120,40,0.07)', filter: 'blur(140px)',
        }}
      />
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, pointerEvents: 'none', zIndex: 0,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(59,130,246,0.05)', filter: 'blur(120px)',
        }}
      />

      {/* Header */}
      <header style={{ paddingTop: 48, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="flex items-baseline">
          <span
            className="font-jakarta font-black"
            style={{ fontSize: 20, color: '#0f172a', letterSpacing: '-0.02em' }}
          >
            Build
          </span>
          <span style={{ fontSize: 20, fontWeight: 400, color: '#0f172a', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Party
          </span>
        </div>
      </header>

      {/* Main content */}
      <main style={{ padding: '48px 24px 96px', maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1
            className="font-jakarta font-black"
            style={{
              fontSize: 46,
              color: '#1A0A00',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Here's what we built for your launch,{' '}
            <span style={{ color: '#9c3f00' }}>Ajay.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#9e6b47', maxWidth: 580, margin: '0 auto', lineHeight: 1.65 }}>
            Velo Live: Async Video AI hit{' '}
            <strong style={{ color: '#4a2506', fontWeight: 700 }}>#1 Product of the Day</strong>
            {' '}on Product Hunt. Let's show the builder community the AI pipeline turning raw recordings into share-ready video messages — in one take.
          </p>
        </header>

        {/* ── Live Session card ── */}
        <section
          className="premium-glass"
          style={{
            borderRadius: 24, padding: '40px 48px', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 48,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', top: -24, right: -24, pointerEvents: 'none',
            width: 128, height: 128, borderRadius: '50%',
            background: 'rgba(163,56,0,0.08)', filter: 'blur(48px)',
          }} />

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', borderRadius: 9999,
              background: 'rgba(156,63,0,0.09)',
              marginBottom: 20,
            }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: '#9c3f00', opacity: 0.6,
                  animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
                }} />
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#9c3f00',
                  display: 'inline-flex', flexShrink: 0,
                }} />
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#9c3f00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Live Event
              </span>
            </div>

            <h2
              className="font-jakarta font-black"
              style={{ fontSize: 36, color: '#1A0A00', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}
            >
              Build with Video AI
            </h2>
            <p style={{ fontSize: 15, color: '#9e6b47', lineHeight: 1.65, marginBottom: 24 }}>
              A live deep-dive into how Velo turns raw screen recordings into polished video messages using a browser agent, AI avatar, and automated script generation — all in one take.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {FEATURE_ITEMS.map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(156,63,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#9c3f00' }}>{icon}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#4a2506' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video preview */}
          <div style={{ width: '44%', flexShrink: 0 }}>
            <div style={{
              aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden',
              position: 'relative', cursor: 'pointer',
              background: '#1a0a00',
            }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK8F6yi8oPiHBC5zvZD_H9NZpUCtPnzUOpPOwCzDRnpJxIltbpofhjQnDakHjoxjko_kdNYcD-qatgc7UZrQDVWR8TIyu0dOf8XqXSryTVNBddTrWb9-mgPvNjxgXurIFcXFPY4g8NyU4nCXiERq8Ks3Un1Apvt_XXlwtnvF6oKGjP642ZVXIdxBexKShuO_0l-rCinguBBB2tS_Fi41XRHoyy6Tgv2ko3cibNv0neVTtrQhhcO2fGUYQpbB3kqZccoa5Jj0TVA7I"
                alt="Session Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82 }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 68, height: 68, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 34, color: '#fff' }}>play_arrow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decode File card ── */}
        <section
          className="premium-glass"
          style={{
            borderRadius: 24, padding: '40px 48px', marginBottom: 20,
            display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 48,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', bottom: -24, left: -24, pointerEvents: 'none',
            width: 128, height: 128, borderRadius: '50%',
            background: 'rgba(59,130,246,0.09)', filter: 'blur(48px)',
          }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 12px', borderRadius: 9999,
              background: 'rgba(37,99,235,0.09)',
              marginBottom: 20,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Decode Theme
              </span>
            </div>
            <h2
              className="font-jakarta font-black"
              style={{ fontSize: 32, color: '#1A0A00', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}
            >
              Velo Decoded
            </h2>
            <p style={{ fontSize: 15, color: '#9e6b47', lineHeight: 1.65, marginBottom: 24 }}>
              A technical breakdown of Velo's AI video pipeline — from browser agent capture to AI avatar synthesis and automated script generation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {DECODE_ITEMS.map(({ icon, label }) => (
                <div key={label} style={{
                  padding: '14px 10px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', gap: 8,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#2563eb' }}>{icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4a2506', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: '44%', flexShrink: 0 }}>
            <div style={{
              aspectRatio: '4/3', borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 8px 32px -8px rgba(0,0,0,0.12)',
            }}>
              <img
                src="/apex/velo-decode-preview.png"
                alt="Velo Live Decode File"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </section>

        {/* ── Course File card ── */}
        <section
          className="premium-glass"
          style={{
            borderRadius: 24, padding: '40px 48px', marginBottom: 56,
            display: 'flex', alignItems: 'center', gap: 48,
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', width: 256, height: 256, borderRadius: '50%',
            background: 'rgba(16,185,129,0.05)', filter: 'blur(48px)',
          }} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 12px', borderRadius: 9999,
              background: 'rgba(16,185,129,0.09)',
              marginBottom: 20,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Learning &amp; Interaction
              </span>
            </div>
            <h2
              className="font-jakarta font-black"
              style={{ fontSize: 32, color: '#1A0A00', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}
            >
              Velo Course
            </h2>
            <p style={{ fontSize: 15, color: '#9e6b47', lineHeight: 1.65, marginBottom: 24 }}>
              An interactive course where participants go hands-on with Velo's core workflow — capturing demos, generating AI avatars, and shipping polished video messages without retakes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {COURSE_ITEMS.map(({ icon, label }) => (
                <div key={label} style={{
                  padding: '14px 10px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', gap: 8,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#059669' }}>{icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4a2506', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: '44%', flexShrink: 0 }}>
            <div style={{
              aspectRatio: '4/3', borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 8px 32px -8px rgba(0,0,0,0.12)',
            }}>
              <img
                src="/apex/velo-microcourse-preview.png"
                alt="Velo Live Course File"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </section>

        {/* ── AI Team ── */}
        <p style={{
          fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.28em', color: '#9e6b47',
          textAlign: 'center', marginBottom: 24,
        }}>
          Managed by Your AI Team
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
          {AI_TEAM.map(({ name, role, desc, icon, color, bg, aura }) => (
            <div
              key={name}
              className="premium-glass"
              style={{ borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: aura, filter: 'blur(40px)', borderRadius: '50%',
                }} />
                <div style={{
                  width: 84, height: 84, borderRadius: '50%',
                  background: bg,
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 42, color, lineHeight: 1 }}>{icon}</span>
                </div>
              </div>
              <h4 className="font-jakarta font-black" style={{ fontSize: 19, color: '#1A0A00', letterSpacing: '-0.02em', marginBottom: 4 }}>
                {name}
              </h4>
              <p style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                {role}
              </p>
              <p style={{ fontSize: 13, color: '#9e6b47', lineHeight: 1.65 }}>{desc}</p>
              <div style={{ marginTop: 18, width: '100%', height: 3, background: 'rgba(0,0,0,0.05)', borderRadius: 9999, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: color, width: '100%', borderRadius: 9999, opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Next steps + CTA ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Checklist */}
          <div>
            <h3
              className="font-jakarta font-black"
              style={{ fontSize: 24, color: '#1A0A00', letterSpacing: '-0.02em', marginBottom: 20 }}
            >
              What you need to do
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKLIST.map(({ text, done }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.5)',
                  border: `1px solid ${done ? 'rgba(156,63,0,0.18)' : 'rgba(255,255,255,0.6)'}`,
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${done ? '#9c3f00' : 'rgba(156,63,0,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && (
                      <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#9c3f00', lineHeight: 1 }}>
                        check
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: done ? '#4a2506' : '#9e6b47' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability + CTA */}
          <div className="premium-glass" style={{ borderRadius: 24, padding: '36px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e6b47', marginBottom: 6 }}>
                  Availability
                </p>
                <p className="font-jakarta font-black" style={{ fontSize: 22, color: '#1A0A00', letterSpacing: '-0.02em' }}>
                  Nov 12 — Nov 15
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e6b47', marginBottom: 6 }}>
                  Duration
                </p>
                <p className="font-jakarta font-black" style={{ fontSize: 18, color: '#1A0A00', letterSpacing: '-0.02em' }}>
                  60 Mins
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/slot-selection')}
              style={{
                width: '100%',
                padding: '15px 0',
                background: 'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 122, 47, 0.3)',
                boxShadow: '0 8px 28px -4px rgba(194,78,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
                color: '#fff0ea',
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 9999,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 14,
              }}
            >
              Pick your time
              <span className="material-symbols-outlined" style={{ fontSize: 18, lineHeight: 1 }}>calendar_today</span>
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(156,63,0,0.42)' }}>
              No account required. Apex handles the calendar sync.
            </p>
          </div>
        </div>

      </main>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
