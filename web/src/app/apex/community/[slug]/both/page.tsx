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
      <div className="fixed top-[132px] left-0 md:left-20 right-0 bottom-16 md:bottom-0 flex flex-col md:flex-row gap-2 p-2 !mt-0">
        <div className="flex-1 rounded-2xl md:rounded-tl-3xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl overflow-hidden">
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
