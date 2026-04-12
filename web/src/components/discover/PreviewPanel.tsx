'use client'

import type { DiscoverSession, DiscoverProgram, DiscoverCommunity } from '@/lib/fixtures/discover-types'

type PreviewType = 'session' | 'program' | 'community' | null
type PreviewData = DiscoverSession | DiscoverProgram | DiscoverCommunity | null

interface PreviewPanelProps {
  type: PreviewType
  data: PreviewData
  open: boolean
  onClose: () => void
}

function SessionPreview({ session }: { session: DiscoverSession }) {
  return (
    <>
      <div className="w-full rounded-[14px] overflow-hidden mb-5 bg-primary/[0.06]" style={{ aspectRatio: '16/10' }}>
        <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed-dim mb-1.5">
        Session
      </div>
      <h3 className="font-jakarta font-black text-xl text-on-surface mb-2">{session.title}</h3>
      <div className="text-[13px] text-on-surface/50 mb-4">by {session.host}</div>
      <p className="text-sm text-on-surface/70 leading-relaxed mb-5">{session.description}</p>
      <div className="h-px bg-primary/10 my-4" />
      <Detail icon="calendar_today" text={session.date} />
      <Detail icon="schedule" text={session.duration} />
      <Detail icon="group" text={`${session.attendees} attending`} />
      <Detail icon="folder" text={`Part of: ${session.programName}`} />
      <CTAButton label="Join Session" />
    </>
  )
}

function ProgramPreview({ program }: { program: DiscoverProgram }) {
  return (
    <>
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
      <div className="h-px bg-primary/10 my-4" />
      <div className="text-xs font-bold uppercase tracking-wide text-on-surface/50 mb-2.5">
        Sessions
      </div>
      {program.sessions.map((s) => (
        <div key={s.title} className="flex items-center gap-2.5 py-2 text-[13px] text-on-surface">
          <img src={s.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <strong className="text-[13px]">{s.title}</strong>
            <br />
            <span className="text-[12px] text-on-surface/50">{s.date}</span>
          </div>
        </div>
      ))}
      <CTAButton label="Enroll in Program" />
    </>
  )
}

function CommunityPreview({ community }: { community: DiscoverCommunity }) {
  return (
    <>
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
      <div className="h-px bg-primary/10 my-4" />
      <div className="text-xs font-bold uppercase tracking-wide text-on-surface/50 mb-2.5">
        Active Programs
      </div>
      {community.programs.map((p) => (
        <div key={p.name} className="flex items-center gap-2.5 py-2 text-[13px] text-on-surface">
          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
          <div>
            <strong className="text-[13px]">{p.name}</strong>
            <br />
            <span className="text-[12px] text-on-surface/50">{p.status}</span>
          </div>
        </div>
      ))}
      <CTAButton label="Join Community" />
    </>
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

function CTAButton({ label }: { label: string }) {
  return (
    <button
      className="w-full h-11 rounded-full border-none text-sm font-bold text-white cursor-pointer mt-5 transition-all hover:-translate-y-px"
      style={{
        background: 'linear-gradient(135deg, #ff7a2f, #e06520)',
        boxShadow: '0 4px 16px rgba(194,78,0,0.25)',
      }}
    >
      {label}
    </button>
  )
}

export default function PreviewPanel({ type, data, open, onClose }: PreviewPanelProps) {
  return (
    <div
      className={`fixed top-16 right-0 bottom-0 w-[380px] z-[45] p-7 px-6 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        background: 'rgba(255,250,247,0.88)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderLeft: '1px solid rgba(156,63,0,0.1)',
        boxShadow: '-8px 0 40px rgba(194,78,0,0.08)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center text-primary transition-colors hover:bg-primary/[0.15]"
        style={{ background: 'rgba(156,63,0,0.08)' }}
        aria-label="Close preview"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
      </button>

      {type === 'session' && data && <SessionPreview session={data as DiscoverSession} />}
      {type === 'program' && data && <ProgramPreview program={data as DiscoverProgram} />}
      {type === 'community' && data && <CommunityPreview community={data as DiscoverCommunity} />}
    </div>
  )
}
