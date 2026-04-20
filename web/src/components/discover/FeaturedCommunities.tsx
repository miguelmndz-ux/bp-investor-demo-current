import type { DiscoverCommunity } from '@/lib/fixtures/discover-types'
import CommunityCard from './CommunityCard'

interface FeaturedCommunitiesProps {
  communities: DiscoverCommunity[]
  onSelect: (community: DiscoverCommunity) => void
}

export default function FeaturedCommunities({ communities, onSelect }: FeaturedCommunitiesProps) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between mb-3.5">
        <h2 className="font-jakarta font-black text-[22px] text-on-surface">
          Featured Communities
        </h2>
        <a href="#" className="text-[13px] font-bold text-primary uppercase tracking-wide hover:underline">
          Show all
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onClick={() => onSelect(community)}
          />
        ))}
      </div>
    </div>
  )
}
