'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface SuccessToastProps {
  title: string
  subtitle: string
  onDismiss: () => void
  duration?: number
}

export default function SuccessToast({ title, subtitle, onDismiss, duration = 4000 }: SuccessToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [onDismiss, duration])

  return createPortal(
    <div
      className="fixed top-6 right-6 z-[200] animate-[slideIn_0.4s_ease] max-w-md"
    >
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        }}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <div>
          <p className="text-white font-bold font-jakarta text-sm leading-tight">{title}</p>
          <p className="text-white/80 text-xs font-medium">{subtitle}</p>
        </div>
      </div>
    </div>,
    document.body
  )
}
