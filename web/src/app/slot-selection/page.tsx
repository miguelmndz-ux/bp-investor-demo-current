'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// April 2026: April 1 = Wednesday → 2 leading empty cells in Mon–Sun grid
const LEADING_EMPTY = 2
const DAYS_IN_APRIL = 30
const TODAY = 15
const MONTH_LABEL = 'April 2026'
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMES = ['10:00am', '3:00pm', '5:00pm']

function getDayName(date: number): string {
  return DAY_NAMES[(date + LEADING_EMPTY - 1) % 7]
}

export default function SlotSelectionPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<number>(TODAY)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  function handleDateClick(day: number) {
    if (day < TODAY) return
    setSelectedDate(day)
    setSelectedTime(null)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #fff6ef 100%)',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {/* ── Logo ── */}
      <header style={{ paddingTop: 48, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, marginBottom: 32 }}>
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

      {/* ── Subtle ambient glow ── */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'rgba(255,120,40,0.06)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── Main three-panel card ── */}
      <main
        className="w-full max-w-5xl premium-glass rounded-2xl flex flex-col md:flex-row relative fade-up-1"
        style={{ overflow: 'hidden' }}
      >
        {/* ═══════════════════════════════════════════
            LEFT — Session info
        ═══════════════════════════════════════════ */}
        <section
          className="flex flex-col justify-between p-10"
          style={{ flex: '1 1 0', position: 'relative', zIndex: 1 }}
        >
          <div>
            {/* Velo product logo */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 13,
                background: 'linear-gradient(135deg, #00115c 0%, #001a80 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                overflow: 'hidden',
                boxShadow: '0 8px 24px -4px rgba(0, 17, 92, 0.35)',
              }}
            >
              <img
                src="https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png?auto=format&fit=crop&w=52&h=52"
                alt="Velo"
                width={52}
                height={52}
                style={{ display: 'block' }}
              />
            </div>

            <h2
              className="font-jakarta font-black"
              style={{
                fontSize: 21,
                color: '#1a0a00',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                marginBottom: 22,
              }}
            >
              Velo Live:<br />Build with AI Video
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: 'schedule', label: '60 min' },
                { icon: 'public', label: 'buildparty.ai' },
              ].map(({ icon, label }) => (
                <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 17, color: '#9c3f00' }}
                  >
                    {icon}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#5a4030' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host row */}
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src="https://ph-avatars.imgix.net/5672627/e909456b-451a-4305-a963-a7bae3bba563.jpeg?auto=format&fit=crop&w=84&h=84"
              alt="Ajay Kumar"
              width={42}
              height={42}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid rgba(255,122,47,0.2)',
                flexShrink: 0,
                display: 'block',
              }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a0a00' }}>
                Ajay Kumar
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#9c3f00',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: 2,
                }}
              >
                Co-founder, Velo
              </div>
            </div>
          </div>
        </section>

        {/* Vitreous divider */}
        <div
          className="hidden md:block self-stretch"
          style={{
            width: 1,
            flexShrink: 0,
            background: 'linear-gradient(to bottom, transparent, rgba(172,173,175,0.18), transparent)',
            margin: '32px 0',
          }}
        />

        {/* ═══════════════════════════════════════════
            CENTER — Calendar
        ═══════════════════════════════════════════ */}
        <section
          className="flex flex-col items-center p-10"
          style={{ flex: '1.25 1 0', position: 'relative', zIndex: 1 }}
        >
          <header className="w-full mb-6">
            <h3
              className="font-jakarta font-black"
              style={{ fontSize: 17, color: '#1a0a00', letterSpacing: '-0.01em' }}
            >
              Select a Date &amp; Time
            </h3>
          </header>

          {/* Month nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 18,
              padding: '0 2px',
            }}
          >
            <button
              className="hover:bg-surface-container transition-all active:scale-90"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 19, color: '#9c3f00' }}>
                chevron_left
              </span>
            </button>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#1a0a00' }}>{MONTH_LABEL}</span>
            <button
              className="hover:bg-surface-container transition-all active:scale-90"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 19, color: '#9c3f00' }}>
                chevron_right
              </span>
            </button>
          </div>

          {/* Day-of-week headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              width: '100%',
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            {DAY_NAMES.map(d => (
              <div
                key={d}
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#b07c60',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 0',
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '3px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {/* Leading empty cells */}
            {Array.from({ length: LEADING_EMPTY }).map((_, i) => (
              <div key={`e${i}`} style={{ height: 36 }} />
            ))}

            {/* Date buttons */}
            {Array.from({ length: DAYS_IN_APRIL }).map((_, i) => {
              const day = i + 1
              const available = day >= TODAY
              const isSelected = selectedDate === day
              const isToday = day === TODAY

              return (
                <button
                  key={day}
                  disabled={!available}
                  onClick={() => handleDateClick(day)}
                  style={{
                    width: 36,
                    height: 36,
                    margin: '0 auto',
                    borderRadius: '50%',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: available ? 'pointer' : 'default',
                    transition: 'all 0.14s ease',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                    ...(isSelected
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
                          color: 'white',
                          fontWeight: 700,
                          boxShadow: '0 4px 14px -2px rgba(194, 78, 0, 0.4)',
                        }
                      : available
                      ? {
                          background: 'transparent',
                          color: isToday ? '#9c3f00' : '#3d2010',
                          fontWeight: isToday ? 700 : 500,
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(0,0,0,0.2)',
                          fontWeight: 400,
                        }),
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Timezone pill */}
          <div style={{ marginTop: 'auto', paddingTop: 20, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.035)',
                borderRadius: 9999,
                padding: '9px 14px',
                fontSize: 11,
                fontWeight: 700,
                color: '#9c7060',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9c3f00' }}>
                language
              </span>
              <span>GMT-7 (Pacific Time)</span>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9c7060' }}>
                arrow_drop_down
              </span>
            </div>
          </div>
        </section>

        {/* Vitreous divider */}
        <div
          className="hidden md:block self-stretch"
          style={{
            width: 1,
            flexShrink: 0,
            background: 'linear-gradient(to bottom, transparent, rgba(172,173,175,0.18), transparent)',
            margin: '32px 0',
          }}
        />

        {/* ═══════════════════════════════════════════
            RIGHT — Time slots
        ═══════════════════════════════════════════ */}
        <section
          className="flex flex-col p-10"
          style={{ flex: '0.85 1 0', position: 'relative', zIndex: 1 }}
        >
          <header style={{ marginBottom: 24 }}>
            <h3
              className="font-jakarta font-black"
              style={{ fontSize: 17, color: '#1a0a00', letterSpacing: '-0.01em' }}
            >
              {getDayName(selectedDate)}, Apr {selectedDate}
            </h3>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {TIMES.map(time => {
              const isSelected = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(isSelected ? null : time)}
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 700,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.14s ease',
                    fontFamily: 'inherit',
                    ...(isSelected
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.18) 100%)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255, 122, 47, 0.4)',
                          boxShadow:
                            '0 4px 16px -2px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                          color: '#7a2e00',
                        }
                      : {
                          background: 'rgba(255,255,255,0.55)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 122, 47, 0.18)',
                          color: '#9c3f00',
                        }),
                  }}
                >
                  {time}
                </button>
              )
            })}

            {/* Next — slides in once a time is selected */}
            {selectedTime && (
              <button
                onClick={() => router.push('/session-confirmation')}
                style={{
                  marginTop: 6,
                  width: '100%',
                  padding: '15px 18px',
                  borderRadius: 9999,
                  background:
                    'linear-gradient(135deg, rgba(255,122,47,0.97) 0%, rgba(194,78,0,0.92) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 122, 47, 0.3)',
                  boxShadow:
                    '0 8px 28px -4px rgba(194,78,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
                  color: '#fff0ea',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                }}
              >
                Next →
              </button>
            )}
          </div>

          {/* Terms */}
          <p
            style={{
              marginTop: 24,
              fontSize: 11,
              color: '#b07c60',
              lineHeight: 1.65,
            }}
          >
            By confirming, you agree to our Terms of Service and Privacy Policy.
          </p>
        </section>
      </main>

    </div>
  )
}
