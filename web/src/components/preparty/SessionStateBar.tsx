'use client'

type SegmentState = 'live' | 'up-next' | 'starting-soon'

interface Segment {
  label: string
  name: string
  state: SegmentState
  countdown?: string
}

const SEGMENTS: Segment[] = [
  { label: 'Live', name: 'Nova: PreParty Lobby', state: 'live' },
  { label: 'Up Next', name: 'Live Build Session', state: 'up-next' },
  { label: 'Starting Soon', name: 'Q&A + Demo', state: 'starting-soon', countdown: '12:00' },
]

const STATE_STYLES: Record<SegmentState, { dot: string; pill: string; labelColor: string }> = {
  live: {
    dot: 'bg-emerald-500 animate-pulse',
    pill: 'bg-emerald-50 border-emerald-200',
    labelColor: 'text-emerald-700',
  },
  'up-next': {
    dot: 'bg-amber-400',
    pill: 'bg-amber-50 border-amber-200',
    labelColor: 'text-amber-700',
  },
  'starting-soon': {
    dot: 'bg-stone-400',
    pill: 'bg-white/70 border-stone-200',
    labelColor: 'text-stone-500',
  },
}

export function SessionStateBar() {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {SEGMENTS.map((seg) => {
        const s = STATE_STYLES[seg.state]
        const detail =
          seg.state === 'starting-soon' && seg.countdown ? seg.countdown : seg.name
        return (
          <div
            key={seg.state}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] ${s.pill}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
            <span className={`font-vcr uppercase tracking-wider ${s.labelColor}`}>
              {seg.label}
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600 font-medium">{detail}</span>
          </div>
        )
      })}
    </div>
  )
}
