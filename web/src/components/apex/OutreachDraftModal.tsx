'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import GmailFlowOverlay from './GmailFlowOverlay'

function EmailIframe() {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(600)

  useEffect(() => {
    const iframe = ref.current
    if (!iframe) return
    const onLoad = () => {
      try {
        const h = iframe.contentDocument?.body?.scrollHeight
        if (h) setHeight(h)
      } catch {}
    }
    iframe.addEventListener('load', onLoad)
    return () => iframe.removeEventListener('load', onLoad)
  }, [])

  return (
    <iframe
      ref={ref}
      src="/gmail-flow/email-body.html"
      sandbox="allow-scripts allow-same-origin"
      scrolling="no"
      style={{ width: '100%', height, border: 'none', display: 'block' }}
    />
  )
}

interface OutreachDraftModalProps {
  onClose: () => void
  onSend?: () => void
}

export default function OutreachDraftModal({ onClose, onSend }: OutreachDraftModalProps) {
  const [sent, setSent] = useState(false)
  const [gmailOpen, setGmailOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Auto-close confirmation overlay after 3.2s — paused while Gmail flow is open
  useEffect(() => {
    if (!sent || gmailOpen) return
    const t = setTimeout(() => { onSend?.(); onClose() }, 3200)
    return () => clearTimeout(t)
  }, [sent, gmailOpen, onSend, onClose])

  // Easter egg: Tab opens Gmail flow while confirmation overlay is showing.
  // Once Gmail is open, GmailFlowOverlay owns Tab/Esc — we stop listening.
  useEffect(() => {
    if (!sent || gmailOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        setGmailOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [sent, gmailOpen])

  const modal = createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-4xl max-h-[90vh] rounded-[32px] overflow-hidden flex flex-col relative shadow-2xl border border-white/60 bg-white/95 backdrop-blur-[40px]">

        {/* Specular highlight */}
        <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-white/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between border-b border-stone-100">
          <h2 className="text-2xl font-black font-jakarta text-on-background">Apex drafted this outreach</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all text-stone-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 [&::-webkit-scrollbar-thumb:hover]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">

          {/* Founder row */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg ring-4 ring-orange-100/30">
                <img
                  src="https://ph-avatars.imgix.net/5672627/e909456b-451a-4305-a963-a7bae3bba563.jpeg"
                  alt="Ajay Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-background">Ajay Kumar</h3>
                <p className="text-stone-500 font-medium text-sm">ajay@velo.video</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-50/50 p-2 rounded-2xl border border-orange-100/40">
              <div className="flex -space-x-1">
                {['mail', 'link', 'close', 'chat_bubble', 'tag'].map((icon) => (
                  <div key={icon} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary border border-orange-100 shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>
                  </div>
                ))}
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">5 channels</span>
            </div>
          </div>

          {/* Channel cards */}
          <div className="space-y-4">

            {/* Email — expanded */}
            <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm overflow-hidden">
              <div className="p-5 flex items-center justify-between bg-white/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">Email</h4>
                    <p className="text-[11px] text-stone-500 font-medium">ajay@velo.video</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-bold text-[11px] rounded-full border border-green-100">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                  <span className="material-symbols-outlined text-stone-400">expand_less</span>
                </div>
              </div>
              <div className="bg-white/10">
                {/* Subject line */}
                <div className="px-8 pt-6 pb-4 border-b border-white/40">
                  <p className="text-sm font-bold text-on-background">
                    <span className="text-stone-500 font-medium">Subject:</span> Velo just hit #1 — BuildParty built a live launch session for you!
                  </p>
                </div>
                {/* Email preview — exact match via iframe */}
                <EmailIframe />
              </div>
            </div>

            {/* LinkedIn — collapsed */}
            <div className="bg-white/30 rounded-3xl border border-white/60 shadow-sm hover:bg-white/40 transition-colors cursor-pointer group">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">LinkedIn</h4>
                    <p className="text-[11px] text-stone-500 font-medium">Ajay Kumar</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-bold text-[11px] rounded-full border border-green-100">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                  <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">expand_more</span>
                </div>
              </div>
            </div>

            {/* X — collapsed */}
            <div className="bg-white/30 rounded-3xl border border-white/60 shadow-sm hover:bg-white/40 transition-colors cursor-pointer group">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                    <span className="material-symbols-outlined">close</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">X (Twitter)</h4>
                    <p className="text-[11px] text-stone-500 font-medium">@ajaykumar</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-bold text-[11px] rounded-full border border-green-100">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                  <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">expand_more</span>
                </div>
              </div>
            </div>

            {/* Discord — collapsed */}
            <div className="bg-white/30 rounded-3xl border border-white/60 shadow-sm hover:bg-white/40 transition-colors cursor-pointer group">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                    <span className="material-symbols-outlined">chat_bubble</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">Discord</h4>
                    <p className="text-[11px] text-stone-500 font-medium">Velo server</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-bold text-[11px] rounded-full border border-green-100">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                  <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">expand_more</span>
                </div>
              </div>
            </div>

            {/* Slack — collapsed */}
            <div className="bg-white/30 rounded-3xl border border-white/60 shadow-sm hover:bg-white/40 transition-colors cursor-pointer group">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                    <span className="material-symbols-outlined">tag</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-background">Slack</h4>
                    <p className="text-[11px] text-stone-500 font-medium">#launches channel</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-bold text-[11px] rounded-full border border-green-100">
                    <span className="material-symbols-outlined text-[14px]">check</span> Ready
                  </span>
                  <span className="material-symbols-outlined text-stone-400 group-hover:text-primary">expand_more</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-6 border-t border-stone-100 bg-white/50 flex items-center gap-4 justify-end">
          <button className="px-6 py-3.5 rounded-2xl bg-transparent border border-stone-200 text-on-background font-bold text-sm hover:bg-stone-50 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Edit drafts
          </button>
          <button
            onClick={() => setSent(true)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-br from-primary-container to-primary text-white font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            Approve &amp; Send All
          </button>
        </div>

      </div>
    </div>,
    document.body
  )

  return (
    <>
      {modal}
      {sent && createPortal(
        <div
          className="confirm-overlay fixed inset-0 z-[80] flex flex-col items-center justify-center cursor-pointer"
          style={{
            background: 'rgba(10, 5, 2, 0.72)',
            backdropFilter: 'blur(20px) saturate(140%)',
            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          }}
          onClick={() => { onSend?.(); onClose() }}
        >
          {/* Icon */}
          <div
            className="confirm-icon w-20 h-20 rounded-full flex items-center justify-center mb-7 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
              boxShadow: '0 0 60px rgba(74,222,128,0.45), 0 8px 32px rgba(22,163,74,0.35)',
            }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 40 }}>check</span>
          </div>

          {/* Title */}
          <h2 className="confirm-title font-jakarta font-black text-white text-3xl mb-3 tracking-tight">
            Outreach sent.
          </h2>

          {/* Subtitle */}
          <p className="confirm-subtitle text-white/60 text-base font-medium">
            Apex sent to 5 channels across 1 founder. We&apos;ll track replies for you.
          </p>

          {/* Tab hint */}
          <p className="confirm-subtitle text-white/20 text-xs font-medium mt-8 flex items-center gap-1.5" style={{ animationDelay: '0.9s' }}>
            <kbd className="px-1.5 py-0.5 rounded-[4px] border border-white/20 font-mono text-[11px]">Tab</kbd>
            see what Ajay sees
          </p>
        </div>,
        document.body
      )}
      {gmailOpen && <GmailFlowOverlay onClose={() => setGmailOpen(false)} />}
    </>
  )
}
