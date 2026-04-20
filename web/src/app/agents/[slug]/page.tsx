'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'

const agentMeta: Record<string, { gradientFrom: string; gradientTo: string; glowColor: string; tagline: string }> = {
  nova: {
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    glowColor: 'rgba(245,158,11,0.4)',
    tagline: 'Session orchestration',
  },
  echo: {
    gradientFrom: '#06b6d4',
    gradientTo: '#0891b2',
    glowColor: 'rgba(6,182,212,0.4)',
    tagline: 'Memory & recaps',
  },
  orbit: {
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
    glowColor: 'rgba(139,92,246,0.4)',
    tagline: 'CoBuild support',
  },
  flare: {
    gradientFrom: '#f43f5e',
    gradientTo: '#e11d48',
    glowColor: 'rgba(244,63,94,0.4)',
    tagline: 'Content & highlights',
  },
}

export default function AgentComingSoonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const meta = agentMeta[slug.toLowerCase()]
  const name = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
      <div className="flex flex-col items-center text-center gap-8 fade-up fade-up-1">
        {meta && (
          <div
            className="w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${meta.gradientFrom}, ${meta.gradientTo})`,
              boxShadow: `0 12px 48px ${meta.glowColor}`,
            }}
          />
        )}

        <div className="flex flex-col gap-2">
          <p className="text-xs font-extrabold tracking-widest text-primary uppercase">
            {meta?.tagline ?? 'BuildParty Agent'}
          </p>
          <h1 className="font-jakarta font-black text-4xl text-on-background">
            {name} is coming soon
          </h1>
          <p className="text-base text-on-background/60 max-w-sm">
            This agent is still in development. Check back during the live demo.
          </p>
        </div>

        <Link
          href="/agents"
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to all agents
        </Link>
      </div>
    </div>
  )
}
