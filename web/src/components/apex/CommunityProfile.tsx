'use client'

import type { PhProduct, Founder } from '@/lib/fixtures/types'
import DecodePreviewCard from './DecodePreviewCard'
import RapidCoursePreviewCard from './RapidCoursePreviewCard'
import ImageCarousel from './ImageCarousel'

interface CommunityProfileProps {
  product: PhProduct
  founders: Founder[]
}

export default function CommunityProfile({ product, founders }: CommunityProfileProps) {
  return (
    <div className="flex items-start gap-10">
      {/* Left column — sticky wrapper (no overflow:hidden so sticky works) */}
      <div className="w-[30%] shrink-0 sticky top-24">
        <div className="premium-glass rounded-2xl p-6 flex flex-col min-h-[calc(100vh-10rem)]">
          {/* Product logo */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-orange-100/40 mb-5 bg-white">
            <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h1 className="text-3xl font-black font-jakarta text-primary leading-tight mb-3">
            {product.name}
          </h1>

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

          {/* Visit website — secondary outline button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-primary font-extrabold font-jakarta px-8 py-3.5 rounded-full text-sm border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all mb-3"
          >
            Visit website
          </a>

          {/* Join community — primary button */}
          <button
            className="block w-full text-center text-white font-extrabold font-jakarta px-8 py-3.5 rounded-full text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)' }}
          >
            Join community
          </button>
        </div>
      </div>

      {/* Right column — scrollable content */}
      <div className="flex-1 space-y-8">
        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {(['Overview', 'Programs', 'Sessions', 'Team'] as const).map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-full text-sm font-bold font-jakarta transition-all ${
                tab === 'Overview'
                  ? 'active:scale-95'
                  : 'text-on-background/60 border border-on-background/20 hover:border-on-background/40 hover:text-on-background'
              }`}
              style={tab === 'Overview' ? {
                background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 122, 47, 0.3)',
                boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                color: '#7a2e00',
              } : undefined}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Full description */}
        {product.description && (
          <div>
            <h2 className="text-xl font-black font-jakarta text-on-background mb-3">About</h2>
            {product.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-on-background/80 leading-relaxed mb-3">{paragraph}</p>
            ))}
          </div>
        )}

        {/* Product images carousel */}
        {product.images.length > 0 && (
          <ImageCarousel images={product.images} productName={product.name} />
        )}

        {/* Decode preview card */}
        {product.decodeUrl && (
          <DecodePreviewCard
            productName={product.name}
            description={`A deep-dive analysis of ${product.name}'s product strategy, technology stack, and competitive positioning generated by Apex.`}
            decodeUrl={product.decodeUrl}
          />
        )}

        {/* Rapid Course preview card */}
        {product.rapidCourseUrl && (
          <RapidCoursePreviewCard
            productName={product.name}
            description={`A hands-on microcourse covering ${product.name}'s core workflows, key concepts, and practical use cases generated by Apex.`}
            rapidCourseUrl={product.rapidCourseUrl}
          />
        )}
      </div>
    </div>
  )
}
