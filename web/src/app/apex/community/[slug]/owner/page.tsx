'use client'

import { useParams } from 'next/navigation'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import CommunityProfile from '@/components/apex/CommunityProfile'

export default function CommunityOwnerPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="text-center py-20 fade-up">
        <span className="material-symbols-outlined text-stone-300 mb-4" style={{ fontSize: '48px' }}>error_outline</span>
        <p className="text-on-background/50 text-lg">Product not found.</p>
      </div>
    )
  }

  const productFounders = founders.filter(f => f.role.includes(product.name))

  return (
    <div className="fade-up">
      <CommunityProfile
        product={product}
        founders={productFounders}
        isOwner={true}
        slug={slug}
      />
    </div>
  )
}
