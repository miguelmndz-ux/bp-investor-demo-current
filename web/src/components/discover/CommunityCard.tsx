import type { DiscoverCommunity } from '@/lib/fixtures/discover-types'

interface CommunityCardProps {
  community: DiscoverCommunity
  onClick: () => void
}

export default function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[18px] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{ aspectRatio: '3/4' }}
    >
      <div className="absolute inset-0">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover block" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(rgba(61,28,0,0.4) 0%, transparent 50%)' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(transparent 40%, rgba(61,28,0,0.75) 100%)' }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className="flex items-end gap-3.5 mb-2.5">
          <div className="w-16 h-16 rounded-[14px] overflow-hidden flex-shrink-0 border-2 border-white/30">
            <img src={community.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
              Community
            </div>
            <div className="font-jakarta font-black text-[22px] text-white leading-tight">
              {community.name}
            </div>
            <div className="text-[13px] text-white/70">
              by {community.owner}
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-[12px] text-white/65 mb-2">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>group</span>
            {community.members} members
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>event</span>
            {community.programCount} programs
          </span>
        </div>

        <button
          className="h-[34px] px-[18px] rounded-full text-[13px] font-bold text-white cursor-pointer transition-all w-fit border border-white/25"
          style={{
            background: 'linear-gradient(135deg, rgba(255,122,47,0.4), rgba(194,78,0,0.3))',
            backdropFilter: 'blur(16px)',
          }}
        >
          Join Community
        </button>
      </div>
    </div>
  )
}
