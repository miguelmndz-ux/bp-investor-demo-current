'use client'

export default function TopNav() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-5rem)] flex justify-between items-center px-12 z-40 bg-white/30 backdrop-blur-2xl h-20 border-b border-white/40">
      <div className="flex items-center gap-10 flex-1">
        <div className="flex flex-col shrink-0">
          <span className="text-xl font-black text-stone-700 block leading-tight tracking-tight font-jakarta">BuildParty</span>
        </div>
        <div className="relative w-full max-w-md premium-glass rounded-full px-4 border-white/60 flex items-center h-10">
          <span className="material-symbols-outlined text-stone-500 shrink-0 mr-2 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search insights, founders, or drafts…"
            className="w-full bg-transparent border-none py-1.5 pl-0 pr-2 text-sm focus:ring-0 text-on-background placeholder-stone-400 font-medium outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-stone-500 hover:bg-white/70 rounded-full transition-all cursor-pointer relative border border-transparent hover:border-white/60 hover:shadow-sm">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white/80" />
          </button>
          <button className="p-2.5 text-stone-500 hover:bg-white/70 rounded-full transition-all cursor-pointer border border-transparent hover:border-white/60 hover:shadow-sm">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=ff7a2f&color=fff&bold=true"
            alt="Admin User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
