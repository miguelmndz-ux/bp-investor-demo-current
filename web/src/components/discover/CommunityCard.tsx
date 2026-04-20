import type { DiscoverCommunity } from '@/lib/fixtures/discover-types'

interface CommunityCardProps {
  community: DiscoverCommunity
  onClick: () => void
}

export default function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[18px] overflow-hidden cursor-pointer aspect-[16/7] md:aspect-[3/4]"
    >
      <div
        className="absolute inset-0 transition-[filter] duration-300"
        style={{ filter: 'blur(2px) brightness(0.75)', transform: 'scale(1.05)' }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'blur(2px) brightness(1)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'blur(2px) brightness(0.75)')}
      >
        <img src={community.image} alt={community.name} className="w-full h-full object-cover block" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 35%, transparent 50%)' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 35%, transparent 50%)' }}
      />

      <div className="absolute top-0 left-0 right-0 p-5 z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-20 h-20 rounded-[14px] overflow-hidden flex-shrink-0 border-2 border-white/30">
            <img src={community.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-jakarta font-black text-[18px] text-white leading-tight">
              {community.name}
            </div>
            <div className="text-[13px] text-white/70">
              by {community.owner}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-5 z-10">
        <button
          className="h-[34px] px-[18px] rounded-full text-[13px] font-bold cursor-pointer transition-all border-none hover:-translate-y-px"
          style={{
            background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 122, 47, 0.3)',
            boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
            color: '#fff',
          }}
        >
          Join
        </button>
      </div>
    </div>
  )
}
