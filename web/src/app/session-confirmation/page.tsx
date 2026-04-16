'use client'

const STEPS = [
  {
    text: 'Apex has automatically generated a Luma event page for your Velo demo session — complete with your decoded profile, session agenda, and speaker bio.',
  },
  {
    text: 'Review your Luma page and share it on Product Hunt and socials to start building your audience.',
  },
  {
    text: 'Nova will brief you in the green room 15 minutes before your session.',
  },
]

export default function SessionConfirmationPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #fff6ef 100%)',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {/* ── Logo ── */}
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

      {/* ── Ambient glow ── */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: -60,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'rgba(255,120,40,0.06)',
          filter: 'blur(90px)',
        }}
      />

      {/* ── Page body ── */}
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '52px 24px 80px',
        }}
      >

        {/* ── Success header ── */}
        <div className="text-center fade-up" style={{ marginBottom: 40 }}>
          {/* Check circle */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #15803d, #22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 20px rgba(21, 128, 61, 0.25)',
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            className="font-jakarta font-black"
            style={{
              fontSize: 32,
              color: '#1a0a00',
              lineHeight: 1.15,
              marginBottom: 12,
              letterSpacing: '-0.025em',
            }}
          >
            You&apos;re confirmed, Ajay.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: '#9c7060',
              lineHeight: 1.65,
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            Your BuildParty launch session is locked in. Here&apos;s what happens next.
          </p>
        </div>

        {/* ── Session details card ── */}
        <div className="premium-glass rounded-2xl fade-up-1" style={{ marginBottom: 20, padding: '24px 28px' }}>

          {/* Session header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 20,
              paddingBottom: 18,
              borderBottom: '1px solid rgba(232,228,220,0.7)',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 11,
                background: 'linear-gradient(135deg, #00115c 0%, #001a80 100%)',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 4px 14px -2px rgba(0, 17, 92, 0.3)',
              }}
            >
              <img
                src="https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png?auto=format&fit=crop&w=48&h=48"
                alt="Velo"
                width={48}
                height={48}
                style={{ display: 'block' }}
              />
            </div>
            <div>
              <div
                className="font-jakarta"
                style={{ fontSize: 16, fontWeight: 700, color: '#1a0a00', marginBottom: 3 }}
              >
                Velo Live: Build with AI Video
              </div>
              <div style={{ fontSize: 13, color: '#9c7060' }}>A BuildParty Launch Session</div>
            </div>
          </div>

          {/* Meta grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
            }}
          >
            {[
              {
                icon: 'calendar_today',
                label: 'Date',
                value: 'Wed, Apr 15',
              },
              {
                icon: 'schedule',
                label: 'Time',
                value: '3:00 PM PT',
              },
              {
                icon: 'timer',
                label: 'Duration',
                value: '60 min',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(255,122,47,0.12) 0%, rgba(194,78,0,0.08) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16, color: '#9c3f00' }}
                  >
                    {icon}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#b07c60',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a0a00' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 18,
              paddingTop: 16,
              borderTop: '1px solid rgba(232,228,220,0.7)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
              Calendar invite sent to ajay@velo.video
            </span>
          </div>
        </div>

        {/* ── What happens next card ── */}
        <div className="premium-glass rounded-2xl fade-up-2" style={{ marginBottom: 36, padding: '24px 28px' }}>
          <div
            className="font-jakarta"
            style={{ fontSize: 15, fontWeight: 700, color: '#1a0a00', marginBottom: 20 }}
          >
            What happens next
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,122,47,0.18) 0%, rgba(194,78,0,0.12) 100%)',
                    border: '1px solid rgba(255,122,47,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#9c3f00',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: '#4a2a10',
                    lineHeight: 1.65,
                    paddingTop: 2,
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center fade-up-3">
          <button
            onClick={() => window.open('/apex/luma-event.html', '_blank')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 36px',
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
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
            }}
          >
              See your Luma page
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
          <p style={{ fontSize: 13, color: '#b07c60', marginTop: 12 }}>
            We&apos;ll pre-fill everything from your Product Hunt launch.
          </p>
        </div>

      </div>
    </div>
  )
}
