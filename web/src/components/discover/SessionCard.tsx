import type { DiscoverSession } from '@/lib/fixtures/discover-types'

interface SessionCardProps {
  session: DiscoverSession
  onClick: () => void
}

export default function SessionCard({ session, onClick }: SessionCardProps) {
  const isLive = session.badge.type === 'live'

  return (
    <div
      onClick={onClick}
      className="group flex flex-col gap-3 p-3.5 rounded-[14px] cursor-pointer transition-all border border-primary/[0.06] hover:shadow-lg hover:-translate-y-[3px]"
      style={{
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="relative w-full aspect-square rounded-[10px] overflow-hidden bg-primary/[0.06]">
        <img
          src={session.image}
          alt={session.title}
          className="w-full h-full object-cover block"
        />
        <button
          className="absolute bottom-2.5 right-2.5 w-11 h-11 rounded-full border-none flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
            boxShadow: '0 6px 20px rgba(194,78,0,0.35)',
          }}
          aria-label={`Play ${session.title}`}
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>
            play_arrow
          </span>
        </button>
      </div>
      <div
        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide rounded-md px-2 py-[3px] w-fit ${
          isLive ? 'text-red-600 bg-red-600/10' : 'text-primary-fixed-dim bg-primary-fixed/10'
        }`}
      >
        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {session.badge.label}
      </div>
      <div className="text-[14.5px] font-bold text-on-surface leading-tight line-clamp-2">
        {session.title}
      </div>
      <div className="text-[12.5px] text-on-surface/50 leading-snug line-clamp-2">
        by {session.host}
      </div>
    </div>
  )
}
