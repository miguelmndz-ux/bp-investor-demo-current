'use client'
import { useParams } from 'next/navigation'
import { phProducts } from '@/lib/fixtures/products'
import CommunityNav from '@/components/apex/CommunityNav'

export default function BothPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)
  if (!product?.decodeUrl || !product?.rapidCourseUrl) return null

  return (
    <>
      <CommunityNav slug={slug} active="both" />
      <div className="fixed top-[132px] left-20 right-0 bottom-0 flex gap-2 p-2">
        <div className="flex-1 rounded-2xl overflow-hidden">
          <iframe
            src={product.decodeUrl}
            title={`${product.name} — Decode`}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-top-navigation"
          />
        </div>
        <div className="flex-1 rounded-2xl overflow-hidden">
          <iframe
            src={product.rapidCourseUrl}
            title={`${product.name} — Course`}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-top-navigation"
          />
        </div>
      </div>
    </>
  )
}
