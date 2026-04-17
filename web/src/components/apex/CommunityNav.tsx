'use client'

import Link from 'next/link'

interface CommunityNavProps {
  slug: string
  active: 'decode' | 'courses' | 'both'
}

export default function CommunityNav({ slug, active }: CommunityNavProps) {
  const liquidGlass = {
    background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 122, 47, 0.3)',
    boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
    color: '#7a2e00',
  }

  const pills: { key: 'decode' | 'courses' | 'both'; label: string; href: string }[] = [
    { key: 'decode', label: 'Decode', href: `/apex/community/${slug}/decode` },
    { key: 'courses', label: 'Course', href: `/apex/community/${slug}/courses` },
    { key: 'both', label: 'Both', href: `/apex/community/${slug}/both` },
  ]

  return (
    <div
      className="fixed top-16 left-20 right-0 h-[68px] z-[46] flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255,122,47,0.15)',
      }}
    >
      {/* Toggle pill group */}
      <div
        className="glass-button rounded-full px-1 py-1 flex items-center gap-1"
      >
        {pills.map(({ key, label, href }) => (
          <Link
            key={key}
            href={href}
            className="rounded-full px-5 py-1.5 text-sm font-extrabold font-jakarta transition-all"
            style={
              active === key
                ? liquidGlass
                : { color: '#b07a5a' }
            }
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Community link */}
      <Link
        href={`/apex/community/${slug}/owner`}
        className="absolute right-6 flex items-center gap-1.5 text-sm font-bold font-jakarta"
        style={{ color: '#b07a5a' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>group</span>
        Community
      </Link>
    </div>
  )
}
