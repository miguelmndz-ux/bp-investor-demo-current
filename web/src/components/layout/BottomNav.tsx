'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Compass, CalendarBlank, Sparkle } from '@phosphor-icons/react'

interface BottomNavItem {
  href: string
  label: string
  icon: ReactNode
  activeIcon: ReactNode
  match: (pathname: string) => boolean
}

const NAV_ITEMS: BottomNavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: <House size={24} weight="bold" />,
    activeIcon: <House size={24} weight="fill" />,
    match: (p) => p === '/',
  },
  {
    href: '/discover',
    label: 'Discover',
    icon: <Compass size={24} weight="bold" />,
    activeIcon: <Compass size={24} weight="fill" />,
    match: (p) => p === '/discover',
  },
  {
    href: '#',
    label: 'Calendar',
    icon: <CalendarBlank size={24} weight="bold" />,
    activeIcon: <CalendarBlank size={24} weight="fill" />,
    match: () => false,
  },
  {
    href: '/apex',
    label: 'Apex',
    icon: <Sparkle size={24} weight="bold" />,
    activeIcon: <Sparkle size={24} weight="fill" />,
    match: (p) => p.startsWith('/apex'),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        height: 64,
        paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon, activeIcon, match }) => {
        const active = match(pathname)
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className="w-[72px] flex flex-col items-center justify-center gap-0.5 py-2 rounded-2xl transition-all duration-200"
            style={active ? {
              background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 122, 47, 0.3)',
              boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              color: '#7a2e00',
            } : { color: '#a8a29e' }}
          >
            {active ? activeIcon : icon}
            <span className="text-[10px] font-bold font-body leading-none">
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
