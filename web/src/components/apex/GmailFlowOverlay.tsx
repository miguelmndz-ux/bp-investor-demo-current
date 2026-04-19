'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

type GmailScreen = 'inbox' | 'email'

interface GmailFlowOverlayProps {
  onClose: () => void
}

export default function GmailFlowOverlay({ onClose }: GmailFlowOverlayProps) {
  const [screen, setScreen] = useState<GmailScreen>('inbox')
  const [visible, setVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()

  // Fade in on mount + lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  // Escape or Tab closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // CTA in email iframe sends 'advance' → navigate to signup
  // Guard on screen === 'email' so inbox clicks never trigger this
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === 'advance' && screen === 'email') {
        setVisible(false)
        setTimeout(() => {
          onClose()
          router.push('/signup')
        }, 350)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [screen, onClose, router])

  // On every iframe load: fix images + clip whitespace, then wire up inbox row
  function handleIframeLoad() {
    try {
      const doc = iframeRef.current?.contentDocument
      if (!doc) return

      // email.html has <base href="https://mail.google.com/..."> which hijacks
      // root-relative /apex/ paths. Re-point any broken image srcs to our origin.
      doc.querySelectorAll<HTMLImageElement>('img').forEach(img => {
        if (img.src.includes('mail.google.com') && img.src.includes('/apex/')) {
          img.src = window.location.origin + '/apex/' + img.src.split('/apex/')[1]
        }
      })

      // Clip horizontal overflow that creates whitespace on the right
      const style = doc.createElement('style')
      style.textContent = 'html,body{max-width:100%!important;overflow-x:hidden!important}'
      doc.head.appendChild(style)

      // Inbox only: wire up the BuildParty email row click
      if (screen === 'inbox') {
        const row = doc.getElementById(':2d')
        if (row) {
          row.style.cursor = 'pointer'
          row.addEventListener('click', () => setScreen('email'))
        }
      }
    } catch {
      // cross-origin guard — should never fire since files are same-origin
    }
  }

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  const src = screen === 'inbox' ? '/gmail-flow/inbox.html' : '/gmail-flow/email.html'

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
        background: 'rgba(8, 4, 2, 0.6)',
        backdropFilter: 'blur(24px) saturate(120%)',
        WebkitBackdropFilter: 'blur(24px) saturate(120%)',
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/50 text-sm font-medium select-none">
          <span
            className={screen === 'inbox' ? 'text-white/90' : 'cursor-pointer hover:text-white/70 transition-colors'}
            onClick={screen === 'email' ? () => setScreen('inbox') : undefined}
          >
            Inbox
          </span>
          {screen === 'email' && (
            <>
              <span className="material-symbols-outlined text-white/30" style={{ fontSize: 16 }}>chevron_right</span>
              <span className="text-white/90">BuildParty outreach</span>
            </>
          )}
        </div>

        {/* Hint + actions */}
        <div className="flex items-center gap-3">
          {screen === 'inbox' && (
            <button
              onClick={() => setScreen('email')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
            >
              Open email
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </button>
          )}
          {screen === 'email' && (
            <span className="flex items-center gap-1.5 text-white/25 text-xs font-medium">
              Press <kbd className="px-1.5 py-0.5 rounded-[4px] border border-white/20 font-mono text-[11px]">Tab</kbd> or <kbd className="px-1.5 py-0.5 rounded-[4px] border border-white/20 font-mono text-[11px]">Esc</kbd> to exit
            </span>
          )}
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors text-white/50 hover:text-white hover:bg-white/10"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
          </button>
        </div>
      </div>

      {/* iframe — fully interactive, body overflow:hidden handles page scroll lock */}
      <div className="flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          key={screen}
          src={src}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleIframeLoad}
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />
      </div>
    </div>,
    document.body
  )
}
