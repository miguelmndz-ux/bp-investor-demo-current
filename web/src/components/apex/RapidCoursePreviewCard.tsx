'use client'

interface RapidCoursePreviewCardProps {
  productName: string
  description: string
  rapidCourseUrl: string
}

export default function RapidCoursePreviewCard({ productName, description, rapidCourseUrl }: RapidCoursePreviewCardProps) {
  return (
    <div className="premium-glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
        >
          bolt
        </span>
        <span className="text-xs font-bold text-primary uppercase tracking-wider">Apex Rapid Course</span>
      </div>
      <h3 className="text-lg font-black font-jakarta text-on-background mb-2">
        {productName} — Microcourse
      </h3>
      <p className="text-sm text-on-background/70 mb-5 leading-relaxed">{description}</p>
      <a
        href={rapidCourseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-jakarta font-bold text-sm rounded-full px-6 py-2.5 transition-all duration-300 active:scale-95 no-underline"
        style={{
          background: 'linear-gradient(135deg, rgba(255,122,47,0.25) 0%, rgba(194,78,0,0.2) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 122, 47, 0.3)',
          boxShadow: '0 8px 32px -4px rgba(194, 78, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
          color: '#7a2e00',
        }}
      >
        View Course
      </a>
    </div>
  )
}
