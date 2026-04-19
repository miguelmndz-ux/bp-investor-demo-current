'use client'

import { usePathname } from 'next/navigation'
import SideNav from './SideNav'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import { useIsMobile } from '@/hooks/useIsMobile'

interface AppShellProps {
  children: React.ReactNode
}

const BARE_ROUTES = ['/signup', '/profile-details', '/what-to-expect', '/slot-selection', '/session-confirmation']

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  if (BARE_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  if (isMobile) {
    return (
      <>
        <TopNav />
        <main className="pt-16 px-4 pb-24">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {children}
          </div>
        </main>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      <SideNav />
      <TopNav />
      {/* ── Header bottom border ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 64, left: 112, right: 0, height: 1, background: 'rgba(0,0,0,0.06)', zIndex: 55 }}
      />
      {/* ── Sidebar right border ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 96, left: 80, width: 1, bottom: 0, background: 'rgba(0,0,0,0.06)', zIndex: 55 }}
      />
      {/* ── Concave corner ── */}
      <div
        className="fixed pointer-events-none"
        style={{ top: 64, left: 80, width: 32, height: 32, zIndex: 55 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: '#ffffff',
            clipPath: 'path("M 24 0 A 24 24 0 0 0 0 24 L 0 0 Z")',
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none"
        style={{
          top: 64,
          left: 80,
          width: 32,
          height: 32,
          borderTopLeftRadius: 24,
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderLeft: '1px solid rgba(0,0,0,0.06)',
          zIndex: 55,
        }}
      />
      <main className="ml-20 pt-28 px-12 pb-12">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {children}
        </div>
      </main>
    </>
  )
}
