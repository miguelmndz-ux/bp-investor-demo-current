import type { WorkflowLogItem } from '@/lib/fixtures/types'

interface AgentWorkflowLogProps {
  items: WorkflowLogItem[]
}

export default function AgentWorkflowLog({ items }: AgentWorkflowLogProps) {
  return (
    <div className="premium-glass rounded-[32px] md:rounded-xl p-4 md:p-7 fade-up fade-up-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black font-jakarta text-on-background">Agent Workflow</h2>
        <button className="p-1.5 text-stone-400 hover:text-primary hover:bg-white/60 rounded-lg transition-all">
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
      </div>
      <div className="space-y-2.5">
        {items.map((item) =>
          item.status === 'pending' ? (
            <div key={item.id} className="flex gap-3 items-start p-3.5 rounded-2xl bg-primary/5 border border-primary/25 hover:bg-primary/10 transition-all cursor-default group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/25">
                <span className="material-symbols-outlined text-white text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-extrabold text-primary truncate">{item.label}</p>
                <p className="text-[10px] font-bold text-primary/60 mt-0.5">{item.timestamp}</p>
              </div>
              <span className="material-symbols-outlined text-xs text-primary/50 mt-1 shrink-0">arrow_forward_ios</span>
            </div>
          ) : (
            <div key={item.id} className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/20 border border-white/40 hover:bg-white/40 transition-all cursor-default group">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-bold text-on-background truncate">{item.label}</p>
                <p className="text-[10px] font-semibold text-stone-400 mt-0.5">{item.timestamp}</p>
              </div>
              <span className="material-symbols-outlined text-xs text-stone-300 mt-1 shrink-0 group-hover:text-stone-400 transition-colors">check_circle</span>
            </div>
          )
        )}
      </div>
      <button className="mt-4 w-full bg-transparent hover:bg-primary/8 active:scale-95 transition-all py-2.5 rounded-full text-sm font-extrabold text-primary flex items-center justify-center gap-3 font-jakarta">
        View full log
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>
    </div>
  )
}
