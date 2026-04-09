'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface OutreachDraftModalProps {
  onClose: () => void
}

export default function OutreachDraftModal({ onClose }: OutreachDraftModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return createPortal(
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
              <div className="p-8 bg-white/10 space-y-6">
                <div className="border-b border-white/40 pb-4">
                  <p className="text-sm font-bold text-on-background">
                    <span className="text-stone-500 font-medium">Subject:</span> Velo hit #1 on Product Hunt — here&apos;s what we built for you
                  </p>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-on-surface">
                  <p className="font-bold">Ajay —</p>
                  <p>Velo hit #1 on Product Hunt today with 617 upvotes. I&apos;ve been reading the comments — builders are genuinely excited about async video finally feeling instant, not like a chore.</p>
                  <p>I decoded your launch and put together a live session built around the question your community is actually asking: what does a real async workflow look like when video is as fast as text?</p>
                  <p>It&apos;s not a webinar. It&apos;s a 50-minute live build session on BuildParty — you demo Velo in a real workflow, your community asks questions in real time, and we close with a 10-minute challenge where attendees replace every Slack message with a Velo clip.</p>
                  <p>We handle everything: the event page, the community, and Nova (our AI host) briefs you 15 minutes before you go live. You just show up and build.</p>
                  <div className="py-4 flex justify-center">
                    <button className="bg-gradient-to-r from-primary-container to-primary text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                      See what&apos;s waiting for you <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                  <p className="text-stone-600 italic text-center">Takes about 2 minutes to book a time. Happy to answer questions before then.</p>
                </div>
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
          <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-br from-primary-container to-primary text-white font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">send</span>
            Approve &amp; Send All
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}
