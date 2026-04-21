'use client'

import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

export type AgentIconName = 'Microphone' | 'Brain' | 'Code' | 'Sparkle' | 'RocketLaunch'

export interface AgentCardProps {
  name: string
  role: string
  iconName: AgentIconName
  accentColor: string
  accentRgb: [number, number, number]
  accentDarkRgb: [number, number, number]
  imageBlend: 'multiply' | 'lighten'
  imageRight?: string
  imageBottom?: string
  imageLeft?: string
  imageTop?: string
  imageWidth?: string
  mobileImageWidth?: string
  mobileImageRight?: string
  mobileImageBottom?: string
  href?: string
}

export default function AgentCard({
  name,
  role,
  accentRgb: [r, g, b],
  imageBlend,
  imageRight = '-8px',
  imageBottom = '-12px',
  imageLeft,
  imageTop,
  imageWidth = '75%',
  mobileImageWidth = '60%',
  mobileImageRight = '-12px',
  mobileImageBottom = '-20px',
  href,
}: AgentCardProps) {
  const isMobile = useIsMobile()
  const destination = href ?? `/agents/${name.toLowerCase()}`

  const imageStyle: React.CSSProperties = isMobile
    ? { width: mobileImageWidth, maxWidth: 'none', height: 'auto', right: mobileImageRight, bottom: mobileImageBottom, mixBlendMode: imageBlend }
    : {
        width: imageWidth,
        maxWidth: 'none',
        height: 'auto',
        ...(imageLeft !== undefined || imageTop !== undefined
          ? { left: imageLeft, top: imageTop }
          : { bottom: imageBottom, right: imageRight }),
        mixBlendMode: imageBlend,
      }

  const card = (
    <div
      className="relative rounded-[20px] overflow-hidden h-[200px] md:h-[400px] cursor-pointer"
      style={{
        background: `linear-gradient(160deg,
          rgba(255,255,255,0.96) 0%,
          rgba(255,255,255,0.90) 42%,
          rgba(${r},${g},${b},0.20) 72%,
          rgba(${r},${g},${b},0.32) 100%)`,
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Text content */}
      <div className="relative z-10 p-5 pt-5 md:p-6 md:pt-7 flex flex-col gap-3">
        <span className="font-vcr text-[13px] tracking-wide uppercase text-on-background/55">
          {role}
        </span>
        <p className="font-jakarta font-black text-[36px] md:text-[46px] leading-none text-on-background">
          {name}
        </p>
      </div>

      {/* Mascot — bottom-right on mobile (uniform), per-agent offsets on desktop */}
      <img
        src={`/agents/${name}.png`}
        alt={name}
        className="absolute pointer-events-none select-none"
        style={imageStyle}
      />
    </div>
  )

  return (
    <Link href={destination} className="block transition-opacity duration-200 hover:opacity-90">
      {card}
    </Link>
  )
}
