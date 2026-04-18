'use client'
import { useParams } from 'next/navigation'
import { phProducts } from '@/lib/fixtures/products'
import CommunityNav from '@/components/apex/CommunityNav'

export default function DecodePage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)
  if (!product?.decodeUrl) return null

  return (
    <>
      <CommunityNav slug={slug} active="decode" />
      <div className="fixed top-16 left-20 right-0 bottom-0 rounded-tl-3xl overflow-hidden !mt-0">
        <iframe
          src={product.decodeUrl}
          title={`${product.name} — Apex Decode`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        />
      </div>
    </>
  )
}
