'use client'

interface SessionTimelineProps {
  elapsed?: string
  total?: string
  progressPercent?: number
}

export function SessionTimeline({
  elapsed = '14:32',
  total = '45:00',
  progressPercent = 32,
}: SessionTimelineProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      <span
        className="text-[11px] font-bold tabular-nums"
        style={{ color: '#7c3aed' }}
      >
        {elapsed}
      </span>

      <div
        className="flex-1 relative h-[3px] rounded-full"
        style={{ background: 'rgba(139, 92, 246, 0.15)' }}
      >
        {/* Filled track */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
          }}
        />
        {/* Scrubber dot */}
        <div
          className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md"
          style={{
            left: `${progressPercent}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#8b5cf6',
          }}
        />
      </div>

      <span className="text-[11px] font-medium tabular-nums text-stone-400">
        {total}
      </span>
    </div>
  )
}
