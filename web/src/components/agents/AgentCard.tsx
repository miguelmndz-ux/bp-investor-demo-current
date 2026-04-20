'use client'

import Link from 'next/link'
import { LockSimple } from '@phosphor-icons/react'

interface AgentCardProps {
  name: string
  description: string
  gradientFrom: string
  gradientTo: string
  glowColor: string
  href?: string
}

export default function AgentCard({
  name,
  description,
  gradientFrom,
  gradientTo,
  glowColor,
  href,
}: AgentCardProps) {
  const isActive = !!href

  const card = (
    <div
      className={`premium-glass rounded-2xl p-6 flex flex-col gap-4 relative h-full${
        isActive ? ' cursor-pointer' : ' opacity-50 cursor-not-allowed'
      }`}
      style={
        isActive
          ? { border: '1px solid rgba(255,122,47,0.3)' }
          : undefined
      }
    >
      {!isActive && (
        <div className="absolute top-4 right-4">
          <LockSimple size={14} weight="bold" className="text-on-background/60" />
        </div>
      )}
      <div className="flex justify-center">
        <div
          className="w-[88px] h-[88px] rounded-full shrink-0"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 8px 32px ${glowColor}`,
          }}
        />
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-background">{name}</h3>
      <p className="text-sm text-on-background/70 leading-relaxed">{description}</p>
    </div>
  )

  if (isActive && href) {
    return (
      <Link href={href} className="block transition-transform duration-200 hover:scale-[1.02]">
        {card}
      </Link>
    )
  }

  return card
}
