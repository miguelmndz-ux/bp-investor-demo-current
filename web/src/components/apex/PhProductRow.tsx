'use client'

import Link from 'next/link'
import type { PhProduct, LifecycleStatus } from '@/lib/fixtures/types'

interface PhProductRowProps {
  product: PhProduct
  rank: number
  onPreviewClick?: () => void
}

const STATUS_CONFIG: Record<LifecycleStatus, { label: string; className: string }> = {
  pending:            { label: 'Pending',    className: 'border-2 border-stone-300' },
  draft_sent:         { label: 'Draft Sent', className: 'border-2 border-amber-400' },
  signed_up:          { label: 'Signed Up',  className: 'border-2 border-blue-400' },
  session_confirmed:  { label: 'Confirmed',  className: 'border-2 border-emerald-400' },
}

export default function PhProductRow({ product, rank, onPreviewClick }: PhProductRowProps) {
  const status = STATUS_CONFIG[product.lifecycleStatus]

  return (
    <div className="grid grid-cols-12 items-center p-3 rounded-2xl bg-white/30 hover:bg-white/55 transition-all group cursor-pointer border border-orange-100/30 shadow-sm">
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-[11px] font-black text-stone-400">{rank}</span>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-[6px] whitespace-nowrap bg-white text-on-background ${status.className}`}>
          {status.label}
        </span>
      </div>
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-md overflow-hidden shadow-md shrink-0 bg-white border border-stone-100">
          <img src={product.logo} alt={`${product.name} logo`} className="w-full h-full object-cover" />
        </div>
        <div className="truncate flex-1 min-w-0">
          <Link
            href={`/apex/community/${product.slug}/owner`}
            className="font-extrabold text-sm text-on-background group-hover:text-primary transition-colors leading-tight hover:underline"
          >
            {product.name}
          </Link>
          <p className="text-[10px] text-stone-500 font-bold truncate leading-tight">{product.category}</p>
        </div>
        {onPreviewClick && (
          <button
            onClick={(e) => { e.stopPropagation(); onPreviewClick() }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-primary text-[10px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap shrink-0 border border-orange-50/80 font-jakarta"
          >
            Preview Outreach
          </button>
        )}
      </div>
      <div className="col-span-5 grid grid-cols-3">
        <div className="text-center"><span className="text-sm font-black text-on-background">{product.votes.toLocaleString()}</span></div>
        <div className="text-center"><span className="text-sm font-black text-on-background">{product.comments}</span></div>
        <div className="text-center"><span className="text-sm font-black text-primary">{product.score}</span></div>
      </div>
    </div>
  )
}
