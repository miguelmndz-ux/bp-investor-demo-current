'use client'

import Link from 'next/link'

interface CommunityNavProps {
  slug: string
  active: 'community' | 'decode' | 'courses' | 'both'
}

const pills: { key: 'community' | 'decode' | 'courses'; label: string; icon: string; href: (slug: string) => string }[] = [
  { key: 'community', label: 'Community', icon: 'groups', href: (s) => `/apex/community/${s}/owner` },
  { key: 'decode', label: 'Decode', icon: 'analytics', href: (s) => `/apex/community/${s}/decode` },
  { key: 'courses', label: 'Course', icon: 'school', href: (s) => `/apex/community/${s}/courses` },
]

export default function CommunityNav({ slug, active }: CommunityNavProps) {
  const liquidGlass = {
    background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 122, 47, 0.3)',
    boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
    color: '#7a2e00',
  }

  return (
    <div
      className="fixed top-[88px] left-0 md:left-20 right-0 h-[68px] z-[46] flex items-center justify-center"
    >
      <div className="rounded-full px-1.5 py-1.5 flex items-center gap-1.5" style={{ background: '#ffffff', border: '1px solid #e7e5e4' }}>
        {pills.map(({ key, label, icon, href }) => (
          <Link
            key={key}
            href={href(slug)}
            className="rounded-full px-3 md:px-5 py-2 md:py-2.5 text-[13px] md:text-[15px] font-extrabold font-jakarta transition-all flex items-center gap-2"
            style={active === key ? liquidGlass : { color: '#b07a5a' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', lineHeight: '1' }}>{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
