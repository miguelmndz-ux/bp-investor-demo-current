'use client'

import AgentCard from '@/components/agents/AgentCard'

const agents = [
  {
    name: 'Nova',
    role: 'AI HOST',
    iconName: 'Microphone' as const,
    accentColor: '#7c3aed',
    accentRgb: [124, 58, 237] as [number, number, number],
    accentDarkRgb: [91, 33, 182] as [number, number, number],
    imageBlend: 'lighten' as const,
    imageRight: '-50px',
    imageBottom: '-28px',
    imageWidth: '85%',
    mobileImageWidth: '44%',
    mobileImageRight: '-36px',
    mobileImageBottom: '-52px',
    href: undefined,
  },
  {
    name: 'Echo',
    role: 'SESSION MEMORY',
    iconName: 'Brain' as const,
    accentColor: '#059669',
    accentRgb: [5, 150, 105] as [number, number, number],
    accentDarkRgb: [4, 120, 87] as [number, number, number],
    imageBlend: 'lighten' as const,
    imageRight: '-81px',
    imageBottom: '-80px',
    imageWidth: '115%',
    mobileImageWidth: '55%',
    mobileImageMaxWidth: '260px',
    mobileImageRight: '-60px',
    mobileImageBottom: '-68px',
    href: undefined,
  },
  {
    name: 'Orbit',
    role: 'BUILD BUDDY',
    iconName: 'Code' as const,
    accentColor: '#2563eb',
    accentRgb: [37, 99, 235] as [number, number, number],
    accentDarkRgb: [29, 78, 216] as [number, number, number],
    imageBlend: 'multiply' as const,
    imageRight: '-40px',
    imageBottom: '-43px',
    imageWidth: '90%',
    mobileImageWidth: '46%',
    mobileImageRight: '-48px',
    mobileImageBottom: '-40px',
    href: undefined,
  },
  {
    name: 'Flare',
    role: 'MEDIA AGENT',
    iconName: 'Sparkle' as const,
    accentColor: '#dc2626',
    accentRgb: [220, 38, 38] as [number, number, number],
    accentDarkRgb: [185, 28, 28] as [number, number, number],
    imageBlend: 'multiply' as const,
    imageRight: '-50px',
    imageBottom: '-19px',
    imageWidth: '87%',
    mobileImageWidth: '40%',
    mobileImageRight: '-36px',
    mobileImageBottom: '-52px',
    href: undefined,
  },
  {
    name: 'Apex',
    role: 'LAUNCH AGENT',
    iconName: 'RocketLaunch' as const,
    accentColor: '#ff7a2f',
    accentRgb: [255, 122, 47] as [number, number, number],
    accentDarkRgb: [194, 78, 0] as [number, number, number],
    imageBlend: 'lighten' as const,
    imageRight: '-46px',
    imageBottom: '-61px',
    imageWidth: '92%',
    mobileImageWidth: '43%',
    mobileImageRight: '-36px',
    mobileImageBottom: '-88px',
    href: '/apex',
  },
]

export default function ConstellationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 10% 90%, rgba(255,122,47,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 10%, rgba(255,180,100,0.07) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(255,240,220,0.15) 0%, transparent 70%),
            #ffffff
          `,
        }}
      />
      <div className="w-full pt-6 md:pt-0">
        <div className="mb-6 md:mb-10 fade-up fade-up-1 flex flex-col md:flex-row md:items-end md:justify-between">
          <h1 className="font-jakarta font-black text-3xl md:text-4xl text-on-background text-center md:text-left">
            Our Agent{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Constellation
            </span>
          </h1>
          <p className="hidden md:block text-base text-on-background/60">
            Five agents, one live operating layer in BuildParty
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 xl:gap-3 fade-up fade-up-2">
          {agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </div>
    </div>
  )
}
