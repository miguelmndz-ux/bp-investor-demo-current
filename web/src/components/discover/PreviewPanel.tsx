'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import type { DiscoverSession, DiscoverProgram, DiscoverCommunity } from '@/lib/fixtures/discover-types'
import { useIsMobile } from '@/hooks/useIsMobile'

type PreviewType = 'session' | 'program' | 'community' | null
type PreviewData = DiscoverSession | DiscoverProgram | DiscoverCommunity | null

interface PreviewPanelProps {
  type: PreviewType
  data: PreviewData
  open: boolean
  onClose: () => void
}

function PreviewToolbar({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        {/* Left: collapse chevron */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-primary/[0.12]"
          style={{ background: 'rgba(156,63,0,0.06)' }}
          aria-label="Collapse panel"
        >
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>keyboard_double_arrow_right</span>
        </button>

        {/* Right: action pills */}
        <div className="flex items-center gap-1.5">
          <button
            className="h-8 px-3.5 rounded-full border-none text-[12px] font-medium cursor-pointer flex items-center gap-1.5 transition-colors hover:bg-primary/[0.12]"
            style={{ background: 'rgba(156,63,0,0.06)', color: '#9c3f00' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>content_copy</span>
            Copy Link
          </button>
          <button
            className="h-8 px-3.5 rounded-full border-none text-[12px] font-medium cursor-pointer flex items-center gap-1.5 transition-colors hover:bg-primary/[0.12]"
            style={{ background: 'rgba(156,63,0,0.06)', color: '#9c3f00' }}
          >
            Event Page
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
          </button>
        </div>
      </div>
      <div className="h-px bg-primary/10 mb-4" />
    </>
  )
}

function RegistrationOverlay({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(onDismiss, 3200)
    return () => { document.body.style.overflow = ''; clearTimeout(t) }
  }, [onDismiss])

  return createPortal(
    <div
      className="confirm-overlay fixed inset-0 z-[80] flex flex-col items-center justify-center cursor-pointer"
      style={{
        background: 'rgba(10, 5, 2, 0.72)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      }}
      onClick={onDismiss}
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
      <h2 className="confirm-title font-jakarta font-black text-white text-3xl mb-3 tracking-tight">
        You&apos;re in!
      </h2>
      <p className="confirm-subtitle text-white/60 text-base font-medium text-center max-w-xs">
        Thank you for joining. You can join the PreParty 30 min before the event.
      </p>
    </div>,
    document.body
  )
}

function ConfirmationBox() {
  const router = useRouter()
  return (
    <div
      className="rounded-2xl p-4 flex-shrink-0 mt-3"
      style={{
        background: 'linear-gradient(135deg, rgba(255,122,47,0.10) 0%, rgba(194,78,0,0.06) 100%)',
        border: '1px solid rgba(255,122,47,0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="material-symbols-outlined text-primary-fixed-dim"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <span className="font-jakarta font-bold text-sm text-on-surface">Thank You for Joining</span>
      </div>
      <p className="text-[13px] text-on-surface/60 mb-3">
        The event starts in 30 minutes. Join the PreParty now to connect with other attendees!
      </p>
      <button
        onClick={() => router.push('/preparty')}
        className="w-full h-11 rounded-full border-none text-sm font-bold font-jakarta text-white cursor-pointer transition-all active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)',
          boxShadow: '0 4px 16px rgba(194,78,0,0.25)',
        }}
      >
        Join PreParty
      </button>
    </div>
  )
}

function SessionPreview({ session, onClose }: { session: DiscoverSession; onClose: () => void }) {
  const [registered, setRegistered] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleRegister = useCallback(() => {
    setShowOverlay(true)
  }, [])

  const handleOverlayDismiss = useCallback(() => {
    setShowOverlay(false)
    setRegistered(true)
  }, [])

  return (
    <>
      <div className="flex flex-col h-full">
        <PreviewToolbar onClose={onClose} />

        {/* 1:1 cover image — shrinks if panel is short */}
        <div className={`${registered ? 'w-1/2 mx-auto' : 'w-full'} rounded-[14px] overflow-hidden mb-4 bg-primary/[0.06] flex-shrink min-h-0`} style={{ aspectRatio: '1/1' }}>
          <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
        </div>

        {/* Session label */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1 flex-shrink-0">
          Session
        </div>

        {/* Title */}
        <h3 className="font-jakarta font-black text-xl text-on-surface mb-1.5 flex-shrink-0">{session.title}</h3>

        {/* Host */}
        <div className="flex items-center gap-2 text-[13px] text-on-surface/50 mb-3 flex-shrink-0">
          <span className="material-symbols-outlined text-primary-fixed-dim" style={{ fontSize: '16px' }}>person</span>
          {session.host}
        </div>

        {/* Description */}
        <p className="text-sm text-on-surface/70 leading-relaxed mb-3 flex-shrink-0">{session.description}</p>

        <div className="h-px bg-primary/10 my-2 flex-shrink-0" />

        {/* Event details */}
        <div className="flex-shrink-0">
          <Detail icon="calendar_today" text={session.date} />
          <Detail icon="schedule" text={session.duration} />
          <Detail icon="group" text={`${session.attendees + (registered ? 1 : 0)} attending`} />
          <Detail icon="folder" text={`Part of: ${session.programName}`} />
        </div>

        <div className="flex-1 min-h-0" />

        {/* Bottom: Register CTA or Confirmation box */}
        {registered ? (
          <ConfirmationBox />
        ) : (
          <CTAButton label="Register" onClick={handleRegister} />
        )}
      </div>

      {showOverlay && <RegistrationOverlay onDismiss={handleOverlayDismiss} />}
    </>
  )
}

function ProgramPreview({ program }: { program: DiscoverProgram }) {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Program
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{program.title}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {program.owner}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{program.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="event_repeat" text={`${program.sessionCount} sessions`} />
      <Detail icon="calendar_today" text={`Starts ${program.startDate}`} />
      <Detail icon="group" text={`${program.enrolled} enrolled`} />
      <Detail icon="workspace_premium" text={program.reward} />
      <div className="flex-1" />
      <CTAButton label="Enroll in Program" />
    </div>
  )
}

function CommunityPreview({ community }: { community: DiscoverCommunity }) {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Community
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{community.name}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {community.owner}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{community.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="group" text={`${community.members} members`} />
      <Detail icon="event" text={`${community.programCount} active programs`} />
      <Detail icon="trending_up" text={`${community.sessionsThisMonth} sessions this month`} />
      <div className="flex-1" />
      <CTAButton label="Join Community" />
    </div>
  )
}

function Detail({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-primary mb-2.5">
      <span className="material-symbols-outlined text-primary-fixed-dim" style={{ fontSize: '18px' }}>
        {icon}
      </span>
      {text}
    </div>
  )
}

function CTAButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 rounded-full border-none text-sm font-bold font-jakarta text-white cursor-pointer mt-3 flex-shrink-0 transition-all hover:shadow-2xl active:scale-95"
      style={{
        background: 'linear-gradient(135deg, #ff7a2f 0%, #c24e00 100%)',
        boxShadow: '0 4px 16px rgba(194,78,0,0.25)',
      }}
    >
      {label}
    </button>
  )
}

export default function PreviewPanel({ type, data, open, onClose }: PreviewPanelProps) {
  const isMobile = useIsMobile()

  return (
    <div
      className={
        isMobile
          ? `fixed bottom-0 left-0 right-0 z-[45] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-t-3xl ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
            }`
          : `fixed top-16 right-0 bottom-0 w-[380px] z-[45] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
            }`
      }
      style={
        isMobile
          ? {
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderTop: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 -8px 40px rgba(74,37,6,0.12)',
            }
          : {
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '-8px 0 40px rgba(74,37,6,0.12)',
            }
      }
    >
      {isMobile && (
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-8 h-1 rounded-full bg-stone-300" />
        </div>
      )}
      <div
        className={`p-6 flex flex-col relative ${isMobile ? 'overflow-visible' : 'h-full overflow-hidden'}`}
      >
        {type === 'session' && data && <SessionPreview session={data as DiscoverSession} onClose={onClose} />}
        {type === 'program' && data && <ProgramPreview program={data as DiscoverProgram} />}
        {type === 'community' && data && <CommunityPreview community={data as DiscoverCommunity} />}
      </div>
    </div>
  )
}
