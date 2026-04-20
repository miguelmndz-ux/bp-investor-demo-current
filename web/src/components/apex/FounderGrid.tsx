import type { Founder } from '@/lib/fixtures/types'
import FounderCard from './FounderCard'

interface FounderGridProps {
  founders: Founder[]
  onOutreachDraft?: () => void
}

export default function FounderGrid({ founders, onOutreachDraft }: FounderGridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
        {founders.map((founder) => (
          <FounderCard key={founder.name} founder={founder} onOutreachDraft={onOutreachDraft} />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <button className="bg-gradient-to-br from-primary-container via-primary-container to-primary hover:brightness-105 active:scale-95 transition-all px-10 py-3.5 rounded-full text-sm font-extrabold text-white flex items-center gap-3 shadow-lg shadow-primary/30 font-jakarta">
          View all founders
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}
