import type { DiscoverSession } from '@/lib/fixtures/discover-types'
import SessionCard from './SessionCard'

interface SessionCarouselProps {
  title: string
  sessions: DiscoverSession[]
  onSelect: (session: DiscoverSession) => void
}

export default function SessionCarousel({ title, sessions, onSelect }: SessionCarouselProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          {title}
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div
        className="grid grid-flow-col gap-4 overflow-x-auto pb-1 pt-1"
        style={{
          gridAutoColumns: '220px',
          scrollbarWidth: 'none',
        }}
      >
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() => onSelect(session)}
          />
        ))}
      </div>
    </div>
  )
}
