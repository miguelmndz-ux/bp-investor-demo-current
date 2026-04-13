'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { communities } from '@/lib/fixtures/communities'

function Tooltip({ label, y }: { label: string; y: number }) {
  return createPortal(
    <div
      className="fixed pointer-events-none z-[200]"
      style={{ left: 92, top: y, transform: 'translateY(-50%)' }}
    >
      <div className="bg-[#1c0900] text-white text-[13px] font-bold font-jakarta px-3 py-[7px] rounded-[8px] shadow-2xl whitespace-nowrap">
        {label}
      </div>
    </div>,
    document.body
  )
}

function NavItem({
  href,
  label,
  active,
  children,
}: {
  href: string
  label: string
  active?: boolean
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [tooltipY, setTooltipY] = useState<number | null>(null)
  return (
    <>
      <Link
        ref={ref}
        href={href}
        className={
          active
            ? 'flex items-center justify-center w-12 h-12 rounded-2xl text-primary transition-all duration-300'
            : 'flex items-center justify-center w-12 h-12 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-2xl transition-all duration-300'
        }
        style={active ? {
          background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 122, 47, 0.3)',
          boxShadow: '0 4px 16px -2px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
        } : undefined}
        onMouseEnter={() => {
          const rect = ref.current?.getBoundingClientRect()
          if (rect) setTooltipY(rect.top + rect.height / 2)
        }}
        onMouseLeave={() => setTooltipY(null)}
      >
        {children}
      </Link>
      {tooltipY !== null && <Tooltip label={label} y={tooltipY} />}
    </>
  )
}

function CommunityItem({
  href,
  label,
  avatar,
  type,
}: {
  href: string
  label: string
  avatar: string
  type: 'creator' | 'community'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [tooltipY, setTooltipY] = useState<number | null>(null)
  return (
    <>
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-11 h-11 overflow-hidden shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 ${
          type === 'creator' ? 'rounded-full ring-2 ring-white/60' : 'rounded-2xl'
        }`}
        onMouseEnter={() => {
          const rect = ref.current?.getBoundingClientRect()
          if (rect) setTooltipY(rect.top + rect.height / 2)
        }}
        onMouseLeave={() => setTooltipY(null)}
      >
        <img src={avatar} alt={label} className="w-full h-full object-cover" />
      </a>
      {tooltipY !== null && <Tooltip label={label} y={tooltipY} />}
    </>
  )
}

function ScanProgressDot({ progress }: { progress: number }) {
  const size = 14
  const r = size / 2
  // Pie slice: start from top (12 o'clock), sweep clockwise
  const angle = progress * 360
  const rad = (angle - 90) * (Math.PI / 180)
  const x = r + r * Math.cos(rad)
  const y = r + r * Math.sin(rad)
  const largeArc = angle > 180 ? 1 : 0

  // Full circle when complete
  const piePath = progress >= 1
    ? `M ${r},0 A ${r},${r} 0 1,1 ${r - 0.001},0 Z`
    : `M ${r},0 A ${r},${r} 0 ${largeArc},1 ${x},${y} L ${r},${r} Z`

  return (
    <div className="absolute -top-0.5 -right-0.5 pointer-events-none z-10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={r} fill="#f5c9a8" />
        <defs>
          <linearGradient id="scanPieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9a5c" />
            <stop offset="100%" stopColor="#ff7a2f" />
          </linearGradient>
        </defs>
        <path
          d={piePath}
          fill="url(#scanPieGradient)"
          style={{ transition: 'all 0.6s ease' }}
        />
      </svg>
    </div>
  )
}

export default function SideNav() {
  const pathname = usePathname()
  const [scanProgress, setScanProgress] = useState(-1)

  useEffect(() => {
    const handler = (e: Event) => {
      const { progress } = (e as CustomEvent).detail
      setScanProgress(progress)
    }
    window.addEventListener('apex-scan-progress', handler)
    return () => window.removeEventListener('apex-scan-progress', handler)
  }, [])

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col items-center py-6 px-4 z-50 w-20"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderRight: '1px solid rgba(255,237,213,0.6)',
        boxShadow: '0 8px 32px -4px rgba(74,37,6,0.12), 0 2px 8px -2px rgba(74,37,6,0.06)',
      }}
    >
      <div className="space-y-3 flex flex-col items-center w-full shrink-0">
        <NavItem href="/apex" label="Home">
          <span className="material-symbols-outlined">home</span>
        </NavItem>
        <NavItem href="/discover" label="Explore" active={pathname === '/discover'}>
          <span className="material-symbols-outlined">explore</span>
        </NavItem>
        <NavItem href="#" label="Calendar">
          <span className="material-symbols-outlined">calendar_today</span>
        </NavItem>
        <div className="relative">
          {scanProgress >= 0 && <ScanProgressDot progress={scanProgress} />}
          <NavItem href="/apex" label="Apex" active={pathname.startsWith('/apex')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>auto_awesome</span>
          </NavItem>
        </div>
      </div>
      <div className="my-3 w-8 h-px bg-orange-200/60 shrink-0" />
      <div
        className="flex-1 overflow-y-auto w-full flex flex-col items-center space-y-2.5 pt-1 pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {communities.map((community) => (
          <CommunityItem
            key={community.name}
            href={community.href}
            label={community.name}
            avatar={community.avatar}
            type={community.type}
          />
        ))}
      </div>
    </aside>
  )
}
