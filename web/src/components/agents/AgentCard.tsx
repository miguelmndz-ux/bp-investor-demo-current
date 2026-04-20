'use client'

import Link from 'next/link'

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
  const destination = href ?? `/agents/${name.toLowerCase()}`

  const card = (
    <div
      className="premium-glass rounded-2xl p-5 md:p-8 flex flex-col gap-4 relative h-full cursor-pointer"
      style={{ border: '1px solid rgba(255,122,47,0.3)' }}
    >
      <div className="flex justify-center">
        <div
          className="w-24 h-24 md:w-[128px] md:h-[128px] rounded-full shrink-0"
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

  return (
    <Link href={destination} className="block transition-opacity duration-200 hover:opacity-90">
      {card}
    </Link>
  )
}
