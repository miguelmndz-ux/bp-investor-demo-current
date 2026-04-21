const statGrid = [
  { label: 'Most Upvotes',    value: '617' },
  { label: 'Upvote Speed',   value: '31 upvotes per hour' },
  { label: 'Total Upvotes',  value: '2,450' },
  { label: 'Most Comments',  value: '143' },
  { label: 'Total Comments', value: '306' },
  { label: '#1 Today',       value: 'Velo' },
  { label: 'Products Today', value: '10' },
  { label: 'Avg Score',      value: '43' },
]

export default function LiveStatsPanel() {
  return (
    <div className="premium-glass rounded-[32px] md:rounded-xl p-4 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black font-jakarta text-on-background">Live Stats</h2>
      </div>
      <div className="p-5 rounded-2xl bg-white/30 border border-orange-100/30 shadow-inner relative overflow-hidden group mb-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,237,213,0.2),transparent_40%)] pointer-events-none" />
        <div className="relative z-10">
          <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest block mb-1">Upvote Velocity</span>
          <span className="text-2xl md:text-4xl font-black font-jakarta text-primary">+31 <span className="text-lg md:text-xl font-extrabold">upvotes per hour</span></span>
          <p className="text-[10px] text-stone-500 font-medium mt-1">#1 Velo · 617 upvotes today</p>
          <div className="mt-3 h-1.5 w-full bg-white/60 rounded-full overflow-hidden border border-white/60">
            <div className="h-full bg-gradient-to-r from-primary-container to-primary w-2/3 rounded-full shadow-[0_0_10px_rgba(156,63,0,0.35)]" />
          </div>
        </div>
        <span className="material-symbols-outlined absolute -right-3 -bottom-3 transition-transform duration-500 group-hover:scale-110 select-none" style={{ fontSize: '6rem', lineHeight: '1', color: 'rgba(156, 63, 0, 0.2)', fontVariationSettings: "'FILL' 1" }}>trending_up</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statGrid.map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-white/60 shadow-sm border border-orange-100/20 hover:bg-white/80 transition-all">
            <span className="block text-[9px] uppercase font-extrabold text-stone-400 tracking-widest mb-1.5">{stat.label}</span>
            <span className="text-xl font-black text-on-background font-jakarta truncate block">{stat.value}</span>
          </div>
        ))}
        <div className="col-span-2 p-4 rounded-2xl bg-white/60 shadow-sm border border-orange-100/20 hover:bg-white/80 transition-all">
          <span className="block text-[9px] uppercase font-extrabold text-stone-400 tracking-widest mb-1.5">Most Popular Topic</span>
          <span className="text-lg font-black text-on-background font-jakarta">Productivity &amp; AI Tools</span>
        </div>
      </div>
    </div>
  )
}
