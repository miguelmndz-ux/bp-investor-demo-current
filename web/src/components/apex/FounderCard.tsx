import type { Founder } from '@/lib/fixtures/types'

interface FounderCardProps {
  founder: Founder
  onOutreachDraft?: () => void
}

export default function FounderCard({ founder, onOutreachDraft }: FounderCardProps) {
  return (
    <div className="premium-glass -mx-6 md:mx-0 rounded-none md:rounded-xl p-4 md:p-6">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-14 h-14 rounded-full shadow-xl ring-4 ring-orange-100/40 shrink-0 border-2 border-white overflow-hidden">
          <img src={founder.avatar} alt={founder.name} className="w-full h-full object-cover" />
        </div>
        <div className="pt-1">
          <h4 className="font-extrabold text-base text-on-background leading-tight">{founder.name}</h4>
          <span className="text-primary text-[11px] font-extrabold font-jakarta bg-primary-container/25 px-2 py-0.5 rounded-full inline-block mt-1">{founder.role}</span>
        </div>
      </div>
      <p className="text-xs text-on-surface font-medium mb-5 leading-relaxed italic text-stone-600">"{founder.quote}"</p>
      <div className="flex gap-2.5">
        <button onClick={onOutreachDraft} className="flex-1 bg-white py-3 md:py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-primary shadow-sm hover:shadow-md transition-all active:scale-95 border border-orange-50/80 hover:bg-orange-50/50">
          <span className="material-symbols-outlined text-xs">mail</span> Outreach Draft
        </button>
        <button className="flex-1 bg-white py-3 md:py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-primary shadow-sm hover:shadow-md transition-all active:scale-95 border border-orange-50/80 hover:bg-orange-50/50">
          <span className="material-symbols-outlined text-xs">open_in_new</span> Preview
        </button>
      </div>
    </div>
  )
}
