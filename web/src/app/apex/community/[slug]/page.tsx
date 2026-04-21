'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import CommunityProfile from '@/components/apex/CommunityProfile'

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="text-center py-20 fade-up">
        <span className="material-symbols-outlined text-stone-300 mb-4" style={{ fontSize: '48px' }}>error_outline</span>
        <p className="text-on-background/50 text-lg">Product not found.</p>
        <Link href="/apex" className="text-primary font-bold text-sm mt-4 inline-block hover:underline">
          Back to Apex
        </Link>
      </div>
    )
  }

  const hasFullProfile = product.description !== null
  const productFounders = founders.filter(f => f.role.includes(product.name))

  return (
    <div className="fade-up">
      {hasFullProfile ? (
        <CommunityProfile product={product} founders={productFounders} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Minimal left column with available data */}
          <div className="w-full md:w-[30%] shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-orange-100/40 mb-5 bg-white">
              <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black font-jakarta text-primary leading-tight mb-2">
              {product.name}
            </h1>
            <span
              className="inline-block text-xs font-bold rounded-full px-4 py-1.5 mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
                border: '1px solid rgba(255, 122, 47, 0.3)',
                color: '#7a2e00',
              }}
            >
              {product.category}
            </span>
            <div className="flex items-center gap-5">
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
          </div>

          {/* Coming soon message */}
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <span className="material-symbols-outlined text-stone-300 mb-3" style={{ fontSize: '40px', fontVariationSettings: "'FILL' 1" }}>
                construction
              </span>
              <p className="text-on-background/50 text-base">
                Apex is still building this community profile. Check back soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
