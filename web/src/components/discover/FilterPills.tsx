'use client'

const FILTERS = ['All', 'AI Tools', 'Creators', 'Schools', 'Bootcamps', 'Live Now']

export default function FilterPills() {
  return (
    <div className="flex gap-2 flex-wrap mb-7">
      {FILTERS.map((label) => (
        <button
          key={label}
          className={
            label === 'All'
              ? 'h-[34px] px-4 rounded-full text-[13px] font-bold cursor-pointer transition-all border border-primary-fixed/30 text-primary'
              : 'h-[34px] px-4 rounded-full text-[13px] font-semibold cursor-pointer transition-all border-none text-primary/70 hover:bg-primary/[0.14]'
          }
          style={
            label === 'All'
              ? {
                  background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px -2px rgba(194,78,0,0.12)',
                }
              : { background: 'rgba(156,63,0,0.08)' }
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}
