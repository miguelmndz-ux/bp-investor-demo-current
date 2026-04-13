'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface RapidCoursePreviewCardProps {
  productName: string
  rapidCourseUrl: string
  isOwner?: boolean
}

export default function RapidCoursePreviewCard({ productName, rapidCourseUrl, isOwner = false }: RapidCoursePreviewCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  function openMenu() {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    setMenuOpen(true)
  }

  return (
    <div className="premium-glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1", color: '#ff7a2f' }}
            >
              bolt
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Apex Rapid Course</span>
          </div>
          <h3 className="text-lg font-black font-jakarta text-on-background">
            {productName} — Microcourse
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isOwner && (
            <>
              <button
                ref={buttonRef}
                onClick={openMenu}
                className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
                title="More actions"
              >
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>more_vert</span>
              </button>
              {menuOpen && createPortal(
                <div
                  className="fixed z-[200] w-36 rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    top: menuPos.top,
                    right: menuPos.right,
                    background: 'rgba(255,250,247,0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,122,47,0.2)',
                    boxShadow: '0 8px 32px -4px rgba(194,78,0,0.15)',
                  }}
                >
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-on-background hover:bg-primary/10 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>edit</span>
                    Edit
                  </button>
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined text-red-500" style={{ fontSize: '16px' }}>delete</span>
                    Delete
                  </button>
                </div>,
                document.body
              )}
            </>
          )}
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
      </div>

      {/* Embedded preview */}
      <div className="rounded-lg overflow-hidden border border-orange-100/30">
        <iframe
          src={rapidCourseUrl}
          title={`${productName} Rapid Course`}
          className="w-full h-[480px] border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}
