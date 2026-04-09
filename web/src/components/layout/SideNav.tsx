'use client'

import Link from 'next/link'
import { communities } from '@/lib/fixtures/communities'

export default function SideNav() {
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
        <Link href="/apex" title="Home" className="flex items-center justify-center w-12 h-12 bg-primary/10 shadow-sm rounded-2xl text-primary transition-all duration-300 border border-primary/20">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>home</span>
        </Link>
        <Link href="#" title="Explore" className="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-2xl transition-all duration-300">
          <span className="material-symbols-outlined">explore</span>
        </Link>
        <Link href="#" title="Calendar" className="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-2xl transition-all duration-300">
          <span className="material-symbols-outlined">calendar_today</span>
        </Link>
      </div>
      <div className="my-3 w-8 h-px bg-orange-200/60 shrink-0" />
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center space-y-2.5 pb-4" style={{ scrollbarWidth: 'none' }}>
        {communities.map((community) => (
          <a
            key={community.name}
            href={community.href}
            target="_blank"
            rel="noopener noreferrer"
            title={community.name}
            className={`flex items-center justify-center w-11 h-11 overflow-hidden shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 ${
              community.type === 'creator' ? 'rounded-full ring-2 ring-white/60' : 'rounded-2xl'
            }`}
          >
            <img src={community.avatar} alt={community.name} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>
    </aside>
  )
}
