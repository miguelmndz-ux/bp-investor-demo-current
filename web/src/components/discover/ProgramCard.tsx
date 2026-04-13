import type { DiscoverProgram } from '@/lib/fixtures/discover-types'

interface ProgramCardProps {
  program: DiscoverProgram
  onClick: () => void
}

export default function ProgramCard({ program, onClick }: ProgramCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center h-14 rounded-[10px] overflow-hidden cursor-pointer transition-[background] duration-300 border border-primary/[0.08]"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(16px)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.55)'}
    >
      <img
        src={program.image}
        alt={program.title}
        className="w-14 h-14 object-cover flex-shrink-0"
      />
      <div className="flex-1 px-3.5 min-w-0">
        <strong className="block text-[13.5px] font-bold text-on-surface truncate">
          {program.title}
        </strong>
        <span className="block text-[11px] text-on-surface/50 truncate">
          {program.owner}
        </span>
      </div>
      <button
        className="w-8 h-8 rounded-full flex-shrink-0 mr-2.5 opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 transition-all flex items-center justify-center border-none cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
          boxShadow: '0 4px 12px rgba(194,78,0,0.3)',
        }}
        aria-label={`Play ${program.title}`}
      >
        <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>
          play_arrow
        </span>
      </button>
    </div>
  )
}
