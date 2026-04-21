'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import GmailFlowOverlay from './GmailFlowOverlay'
import OutlineButton from '@/components/ui/OutlineButton'
import PrimaryButton from '@/components/ui/PrimaryButton'
import {
  EnvelopeSimple,
  LinkedinLogo,
  XLogo,
  DiscordLogo,
  SlackLogo,
  Check,
  X,
  CaretUp,
  CaretDown,
  PencilSimple,
  PaperPlaneTilt,
} from '@phosphor-icons/react'

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

const CHANNELS = [
  { id: 'email',    label: 'Email',      sublabel: 'ajay@velo.video',    Icon: EnvelopeSimple },
  { id: 'linkedin', label: 'LinkedIn',   sublabel: 'Ajay Kumar',         Icon: LinkedinLogo   },
  { id: 'x',        label: 'X (Twitter)',sublabel: '@ajaykumar',         Icon: XLogo          },
  { id: 'discord',  label: 'Discord',    sublabel: 'Velo server',        Icon: DiscordLogo    },
  { id: 'slack',    label: 'Slack',      sublabel: '#launches channel',  Icon: SlackLogo      },
]

function LinkedInDraft() {
  return (
    <div className="px-4 py-4 md:px-8 md:py-6 space-y-4 text-sm leading-relaxed text-on-surface">
      <p>Hey Ajay — congrats on hitting #1 on Product Hunt today.</p>
      <p>I decoded your launch and noticed something: builders aren't just excited about Velo as a tool — they're excited about a workflow shift. Async video that actually feels fast enough to replace Slack messages is a new category, and your PH comments prove it.</p>
      <p>We built something around that insight: a live 60-minute BuildParty session where you demo Velo in a real async workflow, your community builds alongside you, and Nova — our AI host — runs the entire show.</p>
      <p>We handle the event page, the community, and the brief. You just show up and build. Takes about 2 minutes to confirm a slot.</p>
      <p>Would love to have Velo on BuildParty.</p>
    </div>
  )
}

function XDraft() {
  return (
    <div className="px-4 py-4 md:px-8 md:py-6 space-y-3 text-sm leading-relaxed text-on-surface">
      <p>congrats on #1 ajay 🎉</p>
      <p>saw the velo launch — the async video angle is hitting different with builders right now.</p>
      <p>we decoded your launch and built a live session around it on buildparty. 60 min, your community builds a real workflow using velo, nova (our ai host) runs the whole thing.</p>
      <p>you just show up. 2 min to book → [link]</p>
      <div className="pt-2">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Character count</span>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
            <div className="h-full rounded-full bg-green-400" style={{ width: '62%' }} />
          </div>
          <span className="text-[11px] font-bold text-stone-500">218 / 280</span>
        </div>
      </div>
    </div>
  )
}

function DiscordDraft() {
  return (
    <div className="px-4 py-4 md:px-8 md:py-6 space-y-4 text-sm leading-relaxed text-on-surface">
      <p>Hey @Ajay 👋 huge congrats on #1 today — the PH comments are full of builders who want to actually use Velo in their workflows, not just upvote it.</p>
      <p>We decoded your launch and put together a live BuildParty session built around the question your community is actually asking: <span className="font-semibold">what does a real async workflow look like when video is as fast as text?</span></p>
      <p>60-minute live session. Your community builds alongside you. Nova handles the session flow. We handle everything else — event page, community, run of show.</p>
      <p>2 min to book a slot → [link]</p>
    </div>
  )
}

function SlackDraft() {
  return (
    <div className="px-4 py-4 md:px-8 md:py-6 space-y-4 text-sm leading-relaxed text-on-surface">
      <p>🎉 <span className="font-bold">Congrats on the #1 launch Ajay!</span></p>
      <p>617 upvotes and a comments section full of builders who want Velo in their actual workflow — that's not just a good launch, that's product-market signal.</p>
      <p>We decoded the launch and built a live BuildParty session around it: 60 min, you demo Velo in a real async workflow, the community goes hands-on in real time. Nova (our AI host) briefs you 15 min before you go live.</p>
      <p>We handle the event page, the community, and the run of show. You just show up.</p>
      <p>Confirm your slot in 2 min → [link]</p>
      <p className="text-stone-400">— BuildParty team</p>
    </div>
  )
}

interface OutreachDraftModalProps {
  onClose: () => void
  onSend?: () => void
}

export default function OutreachDraftModal({ onClose, onSend }: OutreachDraftModalProps) {
  const [sent, setSent] = useState(false)
  const [gmailOpen, setGmailOpen] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['email']))

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (!sent || gmailOpen) return
    const t = setTimeout(() => { onSend?.(); onClose() }, 3200)
    return () => clearTimeout(t)
  }, [sent, gmailOpen, onSend, onClose])

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
      <div className="w-full mx-4 md:mx-auto md:max-w-4xl max-h-[90vh] rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col relative shadow-2xl border border-white/60 bg-white/95 backdrop-blur-[40px]">

        {/* Specular highlight */}
        <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-white/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="p-4 pb-3 md:p-8 md:pb-4 flex items-center justify-between border-b border-stone-100">
          <h2 className="text-lg md:text-2xl font-black font-jakarta text-on-background">Apex drafted this outreach</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all text-stone-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 md:px-8 md:pt-8 space-y-8 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 [&::-webkit-scrollbar-thumb:hover]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">

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
                {CHANNELS.map(({ id, Icon }) => (
                  <div key={id} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary border border-orange-100 shadow-sm">
                    <Icon size={16} weight="bold" />
                  </div>
                ))}
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">5 channels</span>
            </div>
          </div>

          {/* Channel cards */}
          <div className="space-y-4">

            {CHANNELS.map(({ id, label, sublabel, Icon }) => {
              const isOpen = expanded.has(id)
              return (
                <div
                  key={id}
                  className={`rounded-3xl border border-white/60 shadow-sm overflow-hidden transition-colors ${isOpen ? 'bg-white/40' : 'bg-white/30 hover:bg-white/40 cursor-pointer'}`}
                >
                  {/* Card header */}
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer select-none"
                    onClick={() => toggle(id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-orange-100/40">
                        <Icon size={22} weight="bold" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-background">{label}</h4>
                        <p className="text-[11px] text-stone-500 font-medium">{sublabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 border-2 border-emerald-400 bg-white text-on-background text-[12px] font-extrabold px-3 py-1.5 rounded-[6px] whitespace-nowrap">
                        <Check size={14} weight="bold" className="text-emerald-500" /> Ready
                      </span>
                      {isOpen ? <CaretUp size={18} className="text-stone-400" /> : <CaretDown size={18} className="text-stone-400" />}
                    </div>
                  </div>

                  {/* Card body */}
                  {isOpen && (
                    <div className="bg-white/10 border-t border-white/40">
                      {id === 'email' && (
                        <>
                          <div className="px-4 pt-4 pb-3 md:px-8 md:pt-6 md:pb-4 border-b border-white/40">
                            <p className="text-sm font-bold text-on-background">
                              <span className="text-stone-500 font-medium">Subject:</span> BuildParty loves Velo! Here&apos;s what we built for you
                            </p>
                          </div>
                          <EmailIframe />
                        </>
                      )}
                      {id === 'linkedin' && <LinkedInDraft />}
                      {id === 'x' && <XDraft />}
                      {id === 'discord' && <DiscordDraft />}
                      {id === 'slack' && <SlackDraft />}
                    </div>
                  )}
                </div>
              )
            })}

          </div>

          <div className="pb-8" />
        </div>

        {/* Footer */}
        <div className="p-4 pt-4 md:p-8 md:pt-6 border-t border-stone-100 bg-white/50 flex items-center gap-4 justify-end">
          <OutlineButton icon={<PencilSimple size={18} />}>Edit drafts</OutlineButton>
          <PrimaryButton icon={<PaperPlaneTilt size={18} />} onClick={() => setSent(true)}>Approve &amp; Send All</PrimaryButton>
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
          <div
            className="confirm-icon w-20 h-20 rounded-full flex items-center justify-center mb-7 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
              boxShadow: '0 0 60px rgba(74,222,128,0.45), 0 8px 32px rgba(22,163,74,0.35)',
            }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 40 }}>check</span>
          </div>
          <h2 className="confirm-title font-jakarta font-black text-white text-xl md:text-3xl mb-3 tracking-tight">
            Outreach sent.
          </h2>
          <p className="confirm-subtitle text-white/60 text-base font-medium">
            Apex sent to 5 channels across 1 founder. We&apos;ll track replies for you.
          </p>
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
