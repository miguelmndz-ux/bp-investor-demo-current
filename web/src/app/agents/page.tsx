'use client'

import AgentCard from '@/components/agents/AgentCard'

const agents = [
  {
    name: 'Nova',
    description:
      'Orchestrates every live session — managing introductions, timing, Q&A, and engagement from the moment the room opens.',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    glowColor: 'rgba(245,158,11,0.35)',
    href: undefined,
  },
  {
    name: 'Echo',
    description:
      'Captures everything said in a session and turns it into structured recaps, personalized follow-ups, and searchable memory.',
    gradientFrom: '#06b6d4',
    gradientTo: '#0891b2',
    glowColor: 'rgba(6,182,212,0.35)',
    href: undefined,
  },
  {
    name: 'Orbit',
    description:
      "Lives inside the CoBuild environment — context-aware coding support that adapts to each builder's skill level in real time.",
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
    glowColor: 'rgba(139,92,246,0.35)',
    href: undefined,
  },
  {
    name: 'Flare',
    description:
      'Transforms session highlights into platform-native content — quote cards, threads, highlight reels — minutes after a session ends.',
    gradientFrom: '#f43f5e',
    gradientTo: '#e11d48',
    glowColor: 'rgba(244,63,94,0.35)',
    href: undefined,
  },
  {
    name: 'Apex',
    description:
      'Full-arc product launch director. Runs D-30 to D+30, coordinating assets, outreach, monitoring, and live BuildParty events.',
    gradientFrom: '#ff7a2f',
    gradientTo: '#c24e00',
    glowColor: 'rgba(255,122,47,0.35)',
    href: '/apex',
  },
] as const

export default function AgentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
      <div className="w-full">
      <div className="mb-10 fade-up fade-up-1">
        <p className="text-xs font-extrabold tracking-widest text-primary uppercase mb-3">
          BuildParty Agents
        </p>
        <h1 className="font-jakarta font-black text-2xl md:text-4xl text-on-background mb-2">
          The Constellation
        </h1>
        <p className="text-base text-on-background/60">
          Five agents. One live operating layer.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 fade-up fade-up-2">
        {agents.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>
      </div>
    </div>
  )
}
