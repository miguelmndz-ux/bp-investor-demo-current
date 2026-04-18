'use client'

interface PillButtonProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export default function PillButton({ label, active, onClick }: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-bold font-jakarta transition-all ${
        active
          ? 'active:scale-95'
          : 'text-on-background/60 border border-on-background/20 hover:border-on-background/40 hover:text-on-background'
      }`}
      style={active ? {
        background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 122, 47, 0.3)',
        boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
        color: '#7a2e00',
      } : undefined}
    >
      {label}
    </button>
  )
}
