'use client'

import { useParams } from 'next/navigation'
import { phProducts } from '@/lib/fixtures/products'

export default function MicrocoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const product = phProducts.find(p => p.slug === slug)

  if (!product?.rapidCourseUrl) return null

  return (
    <div className="fixed top-16 left-20 right-0 bottom-0 rounded-tl-3xl overflow-hidden">
      <iframe
        src={product.rapidCourseUrl}
        title={`${product.name} — Microcourse`}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
