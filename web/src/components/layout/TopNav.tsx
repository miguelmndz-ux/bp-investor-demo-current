'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MagnifyingGlass, Bell } from '@phosphor-icons/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function TopNav() {
  const isMobile = useIsMobile()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 z-[55] h-16"
      style={{ background: '#ffffff' }}
    >
      <div className="shrink-0 pl-1">
        <span className="font-jakarta font-black text-stone-700 text-xl tracking-tight">BuildParty</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Search bar — desktop only */}
        {!isMobile && (
          <div className="relative w-80 bg-stone-100 rounded-xl px-4 border border-stone-200 flex items-center h-10 mr-2">
            <MagnifyingGlass size={18} weight="bold" className="text-stone-400 shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search insights, founders, or drafts…"
              className="w-full bg-transparent border-none py-1.5 pl-0 pr-2 text-sm focus:ring-0 text-on-background placeholder-stone-400 font-medium outline-none"
            />
          </div>
        )}

        {/* Search button — mobile only, left of notifications */}
        {isMobile && (
          <button
            onClick={() => setSearchOpen(true)}
            className="w-11 h-11 flex items-center justify-center rounded-full text-stone-400 hover:text-primary hover:bg-stone-50 transition-all shrink-0"
            aria-label="Search"
          >
            <MagnifyingGlass size={22} weight="bold" />
          </button>
        )}

        {/* Notifications */}
        <button className="w-11 h-11 md:w-9 md:h-9 flex items-center justify-center rounded-full text-stone-400 hover:text-primary hover:bg-stone-50 transition-all duration-200 relative shrink-0">
          <Bell size={22} weight="bold" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="w-11 h-11 md:w-10 md:h-10 rounded-full overflow-hidden border border-stone-200 shadow-sm shrink-0 ml-1">
          <img src="/profile-pic.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Search overlay — mobile */}
      {isMobile && searchOpen && createPortal(
        <div
          className="fixed inset-0 z-[200]"
          style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="fixed top-0 left-0 right-0 bg-white"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-6 h-16">
              <MagnifyingGlass size={20} weight="bold" className="text-stone-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search sessions, communities…"
                className="flex-1 bg-transparent border-none text-[15px] text-on-background placeholder-stone-400 outline-none font-medium p-0"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[14px] font-bold ml-2 shrink-0"
                style={{ color: '#c24e00' }}
              >
                Cancel
              </button>
            </div>
            <div className="h-px bg-stone-100" />
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}
