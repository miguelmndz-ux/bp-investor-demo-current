import type { DiscoverProgram } from '@/lib/fixtures/discover-types'
import ProgramCard from './ProgramCard'

interface TrendingProgramsProps {
  programs: DiscoverProgram[]
  onSelect: (program: DiscoverProgram) => void
}

export default function TrendingPrograms({ programs, onSelect }: TrendingProgramsProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          Trending Programs
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onClick={() => onSelect(program)}
          />
        ))}
      </div>
    </div>
  )
}
