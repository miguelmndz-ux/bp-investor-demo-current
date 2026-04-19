'use client'

import { useIsMobile } from '@/hooks/useIsMobile'

export default function TopNav() {
  const isMobile = useIsMobile()

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 z-[55] h-16"
      style={{
        background: '#ffffff',
      }}
    >
      {/* Logo — z-[55] puts TopNav above SideNav (z-50) in the header zone,
          so px-6 + pl-1 = x:28 is visible, matching the preparty layout exactly */}
      <div className="shrink-0 pl-1">
        <span className="font-jakarta font-black text-stone-700 text-xl tracking-tight">BuildParty</span>
      </div>

      <div className="flex-1" />

      {/* Search + actions + avatar */}
      <div className="flex items-center gap-2">
        {/* Search — hidden on mobile to prevent overflow */}
        {!isMobile && (
          <div className="relative w-80 bg-stone-100 rounded-xl px-4 border border-stone-200 flex items-center h-10 mr-2">
            <span className="material-symbols-outlined text-stone-400 shrink-0 mr-2" style={{ fontSize: '18px' }}>search</span>
            <input
              type="text"
              placeholder="Search insights, founders, or drafts…"
              className="w-full bg-transparent border-none py-1.5 pl-0 pr-2 text-sm focus:ring-0 text-on-background placeholder-stone-400 font-medium outline-none"
            />
          </div>
        )}

        {/* Notifications */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full text-stone-400 hover:text-primary hover:bg-stone-50 transition-all duration-200 relative shrink-0">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center rounded-full text-stone-400 hover:text-primary hover:bg-stone-50 transition-all duration-200 shrink-0">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>help</span>
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200 shadow-sm shrink-0 ml-1">
          <img src="/profile-pic.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}
