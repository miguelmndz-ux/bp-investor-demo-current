'use client'

import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'

const SESSION_CARDS = [
  { label: 'Live Build Session',    bg: 'rgba(255, 237, 213, 0.85)' },
  { label: 'Voice AI Workshop',     bg: 'rgba(255, 220, 198, 0.70)' },
  { label: 'Launch Day Demo',       bg: 'rgba(255, 245, 235, 0.90)' },
  { label: 'CoBuild: RAG Pipeline', bg: 'rgba(251, 180, 35,  0.14)' },
  { label: 'Agent Showcase',        bg: 'rgba(255, 107,  0,  0.07)' },
  { label: 'Community Kickoff',     bg: 'rgba(255, 237, 213, 0.95)' },
]

const PARTNER_LOGOS = [
  {
    name: 'ElevenLabs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="4" width="4" height="11" rx="2"/>
        <rect x="8" y="0" width="4" height="15" rx="2"/>
      </svg>
    ),
  },
  {
    name: 'LiveKit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0" y="6" width="3" height="8" rx="1.5"/>
        <rect x="5" y="3" width="3" height="11" rx="1.5"/>
        <rect x="10" y="0" width="3" height="14" rx="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    icon: (
      // Two A-shapes side by side — Anthropic's wordmark motif
      <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor">
        <path d="M3.5 2 L0 14 H1.8 L2.6 11.2 H4.4 L5.2 14 H7 L3.5 2 Z M3 9.2 L3.5 7 L4 9.2 Z"/>
        <path d="M10.5 2 L7 14 H8.8 L9.6 11.2 H11.4 L12.2 14 H14 L10.5 2 Z M10 9.2 L10.5 7 L11 9.2 Z"/>
      </svg>
    ),
  },
  {
    name: 'LangChain',
    icon: (
      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="1" y="4" width="7" height="8" rx="4"/>
        <rect x="10" y="4" width="7" height="8" rx="4"/>
        <line x1="7" y1="8" x2="11" y2="8"/>
      </svg>
    ),
  },
  {
    name: 'Luma',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1 C5.8 4 4 6.5 4 9 C4 11.8 5.8 14 8 15 C10.2 14 12 11.8 12 9 C12 6.5 10.2 4 8 1Z"/>
      </svg>
    ),
  },
]

export default function SignupPage() {
  const router = useRouter()
  const isMobile = useIsMobile()

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(150deg, #fffaf7 0%, #fff1e6 100%)',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* ── Left panel ── */}
      {!isMobile && (
      <div
        className="flex flex-col"
        style={{
          width: '46%',
          padding: '36px 44px',
          overflow: 'hidden',
          borderRight: '1px solid rgba(156, 63, 0, 0.07)',
        }}
      >
        {/* Logo */}
        <div className="flex items-baseline mb-10">
          <span
            className="font-jakarta font-black"
            style={{ fontSize: 20, color: '#0f172a', letterSpacing: '-0.02em' }}
          >
            Build
          </span>
          <span
            style={{ fontSize: 20, fontWeight: 400, color: '#0f172a', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            Party
          </span>
        </div>

        {/* Session card mosaic */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridAutoRows: 104,
            gap: 14,
            alignContent: 'center',
          }}
        >
          {SESSION_CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                background: card.bg,
                border: '1px solid rgba(255, 237, 213, 0.55)',
                backdropFilter: 'blur(20px) saturate(140%)',
                WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                boxShadow: '0 4px 18px -4px rgba(74, 37, 6, 0.07), inset 0 1px 0 rgba(255,255,255,0.55)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '12px 14px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative avatar dot */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,237,213,0.5)',
              }} />
              {/* Decorative content bar */}
              <div style={{
                position: 'absolute', top: 15, left: 14,
                width: '44%', height: 5, borderRadius: 3,
                background: 'rgba(156, 63, 0, 0.07)',
              }} />
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'rgba(74, 37, 6, 0.5)',
                letterSpacing: '0.02em',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}>
                {card.label}
              </span>
            </div>
          ))}
        </div>

        {/* Partner strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          paddingTop: 28,
          flexWrap: 'wrap',
        }}>
          {PARTNER_LOGOS.map(({ name, icon }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'rgba(156, 63, 0, 0.42)',
              }}
            >
              {icon}
              <span style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* ── Right panel ── */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: '#FFFFFF', padding: isMobile ? '32px 20px' : '48px 40px' }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Headline */}
          <h1
            className="font-jakarta font-black"
            style={{
              fontSize: 30,
              color: '#1A0A00',
              marginBottom: 10,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Launch on BuildParty
          </h1>
          <p style={{
            fontSize: 15,
            color: '#9e6b47',
            lineHeight: 1.55,
            marginBottom: 32,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            Go live with your builder community.<br />No setup required.
          </p>

          {/* Google OAuth button */}
          <button
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 0',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(156, 63, 0, 0.14)',
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 500,
              color: '#4a2506',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              boxShadow: '0 2px 8px -2px rgba(74,37,6,0.06)',
              transition: 'background 0.15s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* OR divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '22px 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(156,63,0,0.1)' }} />
            <span style={{
              fontSize: 13,
              color: 'rgba(156,63,0,0.32)',
              fontWeight: 500,
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}>
              or
            </span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(156,63,0,0.1)' }} />
          </div>

          {/* Email input */}
          <input
            type="email"
            defaultValue="ajay@velo.video"
            readOnly
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: 15,
              color: '#4a2506',
              border: '1px solid #e7e5e4',
              borderRadius: 9999,
              outline: 'none',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              background: '#f5f5f4',
              marginBottom: 12,
              display: 'block',
            }}
          />

          {/* CTA — liquid glass orange */}
          <button
            onClick={() => router.push('/profile-details')}
            style={{
              width: '100%',
              padding: '14px 0',
              background: 'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 122, 47, 0.3)',
              boxShadow: '0 8px 28px -4px rgba(194,78,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
              color: '#fff0ea',
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 9999,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            Get started
          </button>

          {/* Terms */}
          <p style={{
            fontSize: 12,
            color: 'rgba(156,63,0,0.38)',
            textAlign: 'center',
            marginTop: 14,
            lineHeight: 1.55,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            Signing up means you agree with our terms and conditions
          </p>

          {/* Log in link */}
          <p style={{
            fontSize: 14,
            color: '#9e6b47',
            textAlign: 'center',
            marginTop: 24,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            Already have an account?{' '}
            <a
              href="#"
              style={{ color: '#9c3f00', fontWeight: 600, textDecoration: 'none' }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
