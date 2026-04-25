'use client'

import Image from 'next/image'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  RocketLaunch,
  Presentation,
  ChalkboardTeacher,
  Trophy,
  BookOpen,
  UsersThree,
} from '@phosphor-icons/react'

const SESSION_TYPES = [
  { label: 'Launch',  Icon: RocketLaunch,       color: 'border-orange-400' },
  { label: 'Demo',    Icon: Presentation,        color: 'border-blue-400'   },
  { label: 'Teach',   Icon: ChalkboardTeacher,   color: 'border-violet-400' },
  { label: 'Compete', Icon: Trophy,              color: 'border-red-400'    },
  { label: 'Learn',   Icon: BookOpen,            color: 'border-emerald-400'},
  { label: 'CoBuild', Icon: UsersThree,          color: 'border-teal-400'   },
]

export default function AgentsIntroPage() {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] text-center">
      {/* Page-specific background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(255,122,47,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(255,180,100,0.06) 0%, transparent 50%),
            #ffffff
          `,
        }}
      />

      {/* Logo with float animation */}
      <div className="float fade-up fade-up-1 mb-0" style={{ filter: 'drop-shadow(0 24px 48px rgba(180,100,30,0.22))' }}>
        <Image
          src="/bp-icon.png"
          alt="BuildParty"
          width={280}
          height={280}
          priority
          className="w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
        />
      </div>

      {/* Headline + subheadline tight-grouped */}
      <div className="mb-8 md:mb-14 fade-up fade-up-2">
        <h1 className="font-jakarta font-black text-4xl md:text-5xl text-on-background mb-4">
          Welcome to BuildParty!
        </h1>
        <p className="text-base md:text-xl text-on-background/55 max-w-2xl">
          Live agentic infrastructure for AI builder communities. Activate, engage, and measure with our native AI agents.
        </p>
      </div>

      {/* Session type pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 md:mb-24 fade-up fade-up-3">
        {SESSION_TYPES.map(({ label, Icon, color }) => (
          <span
            key={label}
            className={`flex items-center gap-1.5 border-2 ${color} bg-white text-on-background rounded-[8px] px-3 py-1.5 text-[11px] font-extrabold whitespace-nowrap`}
          >
            <Icon size={13} weight="bold" />
            {label}
          </span>
        ))}
      </div>

      {/* CTA — fixed above BottomNav on mobile, inline on desktop */}
      <div
        className={`fade-up fade-up-4 ${isMobile ? 'fixed left-0 right-0 px-5 pb-3' : ''}`}
        style={isMobile ? { bottom: 64 } : undefined}
      >
        <PrimaryButton
          href="/agents/constellation"
          fullWidth={isMobile}
        >
          See our AI agents
        </PrimaryButton>
      </div>
    </div>
  )
}
