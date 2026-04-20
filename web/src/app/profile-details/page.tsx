'use client'

import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ProfileDetailsPage() {
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
      {/* ── Left panel — Velo blue ── */}
      {!isMobile && (
      <div
        className="flex flex-col"
        style={{
          width: '46%',
          padding: '36px 44px',
          background: 'linear-gradient(150deg, #EBF0FF 0%, #DDE6FF 100%)',
        }}
      >
        {/* Logo — white on blue */}
        <div className="flex items-baseline mb-12">
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

        {/* Centered preview area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(0, 68, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 22,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            Your brand has been set up
          </p>

          {/* Preview card */}
          <div style={{
            width: 360,
            borderRadius: 20,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.97)',
            boxShadow: '0 24px 64px -12px rgba(0, 0, 0, 0.35), 0 8px 24px -4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}>
            {/* Card header — dark navy */}
            <div style={{
              background: 'linear-gradient(135deg, #00115c 0%, #001a80 100%)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Velo logo */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                <img
                  src="https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png?auto=format&fit=crop&w=88&h=88"
                  alt="Velo"
                  width={44}
                  height={44}
                  style={{ display: 'block' }}
                />
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>
                  Velo Live: Async Video AI
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 3 }}>
                  Hosted on BuildParty
                </div>
              </div>
            </div>

            {/* Card body — skeleton lines */}
            <div style={{ padding: '20px 24px' }}>
              {[100, 75, 52, 85].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 9,
                    borderRadius: 5,
                    background: 'rgba(0, 68, 255, 0.07)',
                    width: `${w}%`,
                    marginBottom: i < 3 ? 10 : 0,
                  }}
                />
              ))}
            </div>

            {/* Card footer */}
            <div style={{
              padding: '13px 24px 18px',
              borderTop: '1px solid rgba(0, 68, 255, 0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Upload logo
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  Brand color
                </span>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#0044FF',
                  border: '2px solid rgba(0,68,255,0.15)',
                  boxShadow: '0 2px 8px rgba(0,68,255,0.35)',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ── Right panel ── */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: '#FFFFFF', padding: isMobile ? '32px 20px' : '48px 40px' }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>

          <h1
            className="font-jakarta font-black"
            style={{
              fontSize: 30,
              color: '#1A0A00',
              marginBottom: 32,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            The final details
          </h1>

          {/* Name row */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'First name', value: 'Ajay' },
              { label: 'Last name',  value: 'Kumar' },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#6b7280',
                  marginBottom: 6,
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}>
                  {label}
                </label>
                <input
                  type="text"
                  defaultValue={value}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '11px 18px',
                    fontSize: 15,
                    color: '#4a2506',
                    background: '#f5f5f4',
                    border: '1px solid #e7e5e4',
                    borderRadius: 9999,
                    outline: 'none',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Single-field rows */}
          {[
            { label: 'Email',   type: 'email', value: 'ajay@velo.video'  },
            { label: 'Company', type: 'text',  value: 'Velo'             },
            { label: 'Role',    type: 'text',  value: 'Co-founder'       },
          ].map(({ label, type, value }, i, arr) => (
            <div key={label} style={{ marginBottom: i < arr.length - 1 ? 16 : 28 }}>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 500,
                color: '#6b7280',
                marginBottom: 6,
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}>
                {label}
              </label>
              <input
                type={type}
                defaultValue={value}
                readOnly
                style={{
                  width: '100%',
                  padding: '11px 18px',
                  fontSize: 15,
                  color: '#4a2506',
                  background: '#f5f5f4',
                  border: '1px solid #e7e5e4',
                  borderRadius: 9999,
                  outline: 'none',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              />
            </div>
          ))}

          {/* CTA */}
          <button
            onClick={() => router.push('/what-to-expect')}
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
              marginBottom: 20,
            }}
          >
            Continue
          </button>

          {/* Change email */}
          <p style={{
            textAlign: 'center',
            fontSize: 13,
            color: '#6b7280',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            ajay@velo.video{' '}
            <a href="#" style={{ color: '#9c3f00', fontWeight: 500, textDecoration: 'none' }}>
              Change email
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}
