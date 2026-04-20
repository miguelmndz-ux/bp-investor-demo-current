interface HeroCardProps {
  draftCount: number
}

export default function HeroCard({ draftCount }: HeroCardProps) {
  return (
    <section className="fade-up relative overflow-hidden rounded-[24px] md:rounded-xl bg-gradient-to-br from-primary-container via-primary-container to-primary p-6 md:p-12 min-h-[180px] md:min-h-0 text-on-primary-container shadow-2xl border-t border-l border-orange-100/40 flex items-center justify-between">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_25%)] pointer-events-none" />
      <div className="relative z-10 space-y-3 md:space-y-6 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-black font-jakarta tracking-tight leading-tight drop-shadow-sm text-white">
          Apex has drafted{' '}
          <span className="text-on-primary-container/90">{draftCount} new</span>{' '}
          outreaches.
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="bg-white/95 text-primary font-extrabold px-8 py-3.5 rounded-full text-base shadow-xl hover:bg-white active:scale-95 transition-all border border-white font-jakarta">
            Review Drafts
          </button>
          <p className="text-white font-semibold bg-black/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm">
            Scanned 420+ products in last 24h
          </p>
        </div>
      </div>
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-8 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 opacity-20 drop-shadow-2xl pointer-events-none select-none">
        <span className="material-symbols-outlined text-white" style={{ fontSize: '96px', lineHeight: '1', fontVariationSettings: "'FILL' 1, 'wght' 700" }}>auto_awesome</span>
      </div>
    </section>
  )
}
