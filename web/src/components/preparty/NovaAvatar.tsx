'use client'

export function NovaAvatar({ size = 180 }: { size?: number }) {
  const sphereSize = Math.round(size * 0.55)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Three rings — each plays nova-pulse staggered 0.8s apart */}
      {[0, 0.8, 1.6].map((delay) => (
        <div
          key={delay}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'rgba(139, 92, 246, 0.45)',
            animation: `nova-pulse 2.4s ease-out infinite ${delay}s`,
          }}
        />
      ))}

      {/* Violet sphere */}
      <div
        className="relative rounded-full"
        style={{
          width: sphereSize,
          height: sphereSize,
          background:
            'radial-gradient(circle at 35% 35%, #c4b5fd 0%, #8b5cf6 45%, #5b21b6 80%, #3b0764 100%)',
          boxShadow:
            '0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.25)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}
      />
    </div>
  )
}
