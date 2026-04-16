'use client'

import type { PhProduct, Founder } from '@/lib/fixtures/types'
import DecodePreviewCard from './DecodePreviewCard'
import RapidCoursePreviewCard from './RapidCoursePreviewCard'
import ImageCarousel from './ImageCarousel'
import PillButton from '@/components/ui/PillButton'

interface CommunityProfileProps {
  product: PhProduct
  founders: Founder[]
  isOwner?: boolean
  slug?: string
}

export default function CommunityProfile({ product, founders, isOwner = false, slug }: CommunityProfileProps) {
  return (
    <div className="flex items-start gap-10">
      {/* Left column — sticky wrapper (no overflow:hidden so sticky works) */}
      <div className="w-[30%] shrink-0 sticky top-24">
        <div className="premium-glass rounded-2xl p-6 flex flex-col min-h-[calc(100vh-10rem)]">
          {/* Product logo */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-orange-100/40 mb-5 bg-white">
            <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
          </div>

          {/* Name + badge */}
          <div className="flex items-center gap-2.5 mb-3">
            <h1 className="text-3xl font-black font-jakarta text-primary leading-tight">
              {product.name}
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white rounded-full px-3 py-1 bg-[#7a2e00]">
              Community
            </span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>arrow_upward</span>
              <span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>mode_comment</span>
              <span className="text-sm font-black text-on-background">{product.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>bolt</span>
              <span className="text-sm font-black text-primary">{product.score}</span>
            </div>
          </div>

          {/* Brief description */}
          {product.tagline && (
            <p className="text-sm text-on-background/70 leading-relaxed mb-5">{product.tagline}</p>
          )}

          {/* Founder cards */}
          {founders.length > 0 && (
            <div className="space-y-3">
              {founders.map((founder) => (
                <div key={founder.name} className="premium-glass rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm shrink-0 border border-white/60">
                    <img src={founder.avatar} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-on-background leading-tight">{founder.name}</p>
                    <p className="text-xs text-on-background/60 font-semibold">{founder.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Spacer pushes buttons to bottom */}
          <div className="flex-1" />

          {/* Secondary button */}
          {isOwner ? (
            <a
              href={slug ? `/apex/community/${slug}` : '#'}
              className="block w-full text-center text-primary font-extrabold font-jakarta px-8 py-3.5 rounded-full text-sm border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all mb-3"
            >
              See public view
            </a>
          ) : (
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-primary font-extrabold font-jakarta px-8 py-3.5 rounded-full text-sm border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all mb-3"
            >
              Visit website
            </a>
          )}

          {/* Primary button */}
          <button
            className="block w-full text-center text-white font-extrabold font-jakarta px-8 py-3.5 rounded-full text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)' }}
          >
            {isOwner ? 'Community settings' : 'Join community'}
          </button>
        </div>
      </div>

      {/* Right column — scrollable content */}
      <div className="flex-1 space-y-8">
        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {(['Overview', 'Programs', 'Sessions', 'Team'] as const).map((tab) => (
            <PillButton key={tab} label={tab} active={tab === 'Overview'} />
          ))}
        </div>

        {/* Full description */}
        {product.description && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-black font-jakarta text-on-background">About</h2>
              {isOwner && (
                <button
                  className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
                  title="Edit about"
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>edit</span>
                </button>
              )}
            </div>
            {product.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-on-background/80 leading-relaxed mb-3">{paragraph}</p>
            ))}
          </div>
        )}

        {/* Product images carousel */}
        {product.images.length > 0 && (
          <ImageCarousel images={product.images} productName={product.name} isOwner={isOwner} />
        )}

        {/* Decode preview card */}
        {product.decodeUrl && (
          <DecodePreviewCard
            productName={product.name}
            decodeUrl={product.decodeUrl}
            slug={product.slug}
            isOwner={isOwner}
          />
        )}

        {/* Rapid Course preview card */}
        {product.rapidCourseUrl && (
          <RapidCoursePreviewCard
            productName={product.name}
            rapidCourseUrl={product.rapidCourseUrl}
            slug={product.slug}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  )
}
