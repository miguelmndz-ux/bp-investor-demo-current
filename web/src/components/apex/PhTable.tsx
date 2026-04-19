'use client'

import type { PhProduct } from '@/lib/fixtures/types'
import PhProductRow from './PhProductRow'

interface PhTableProps {
  products: PhProduct[]
  onVeloPreview?: () => void
}

export default function PhTable({ products, onVeloPreview }: PhTableProps) {
  return (
    <div className="premium-glass rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black font-jakarta text-on-background">ProductHunt Top 10</h2>
          <p className="text-xs text-stone-500 font-semibold mt-0.5">Updated · Today</p>
        </div>
        <button className="glass-button px-4 py-2 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 border-white/50">
          <span className="material-symbols-outlined text-sm">refresh</span> Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-12 px-4 mb-3 text-[10px] uppercase font-extrabold text-stone-400 tracking-widest items-end">
            <div className="col-span-1"></div>
            <div className="col-span-1 pb-0.5">Status</div>
            <div className="col-span-5 pb-0.5 pl-7">Product</div>
            <div className="col-span-5 grid grid-cols-3 text-center">
              <div className="flex flex-col items-center gap-0.5">
                <span className="material-symbols-outlined text-primary text-base">arrow_upward</span>
                <span>Votes</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="material-symbols-outlined text-primary text-base">mode_comment</span>
                <span>Comments</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="material-symbols-outlined text-primary text-base">bolt</span>
                <span>Score</span>
              </div>
            </div>
          </div>
        <div className="space-y-2.5">
          {products.map((product, index) => (
            <PhProductRow
              key={product.name}
              product={product}
              rank={index + 1}
              onPreviewClick={onVeloPreview}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
