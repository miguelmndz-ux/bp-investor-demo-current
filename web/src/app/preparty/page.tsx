'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { Smiley } from '@phosphor-icons/react'
import { NovaAvatar } from '@/components/preparty/NovaAvatar'
import { SessionStateBar } from '@/components/preparty/SessionStateBar'
import { SessionTimeline } from '@/components/preparty/SessionTimeline'

// ─── Avatar pool ──────────────────────────────────────────────────────────────
const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face',
]

// ─── Tables: 8 × 5 slots (avatar index | null = empty seat) ──────────────────
const TABLES: (number | null)[][] = [
  [0, 1, null, 2, null],
  [3, null, 4, null, null],
  [3, 1,    null, null, null],
  [0, null, null, null, null],
  [3, 2,    1,    null, null],
  [null, 4, null, null, null],
  [0, 3,    null, null, null],
  [null, null, null, null, null],
]

// ─── Chat messages ────────────────────────────────────────────────────────────
interface ChatMsg {
  id: number
  name: string
  time: string
  text: string
  reactions: { emoji: string; count: number }[]
  isStaff: boolean
  avatar?: string
  initials?: string
  avatarBg?: string
}

const MESSAGES: ChatMsg[] = [
  {
    id: 1,
    name: 'Tyler Huang',
    initials: 'TH',
    avatarBg: 'bg-cyan-400',
    time: '10:42 PM',
    text: 'wait is that silero VAD? thought LiveKit used webrtcvad',
    reactions: [{ emoji: '🔥', count: 4 }],
    isStaff: false,
  },
  {
    id: 2,
    name: 'Chris Wilson',
    avatar: AVATARS[1],
    time: '10:43 PM',
    text: 'we switched to silero — better accuracy. WebRTC still supported 👍',
    reactions: [],
    isStaff: true,
  },
  {
    id: 3,
    name: 'Dylan James',
    avatar: AVATARS[2],
    time: '10:43 PM',
    text: "I tried building this with raw WebSockets for 3 weeks. I feel both validated and personally attacked 😭",
    reactions: [{ emoji: '❤️', count: 6 }, { emoji: '🔥', count: 11 }],
    isStaff: false,
  },
  {
    id: 4,
    name: 'Kimi Hindman',
    avatar: AVATARS[0],
    time: '10:45 PM',
    text: 'ElevenLabs Turbo in demo — one-line swap in agent config ✨',
    reactions: [],
    isStaff: true,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function TableSlot({ avatarIndex }: { avatarIndex: number | null }) {
  if (avatarIndex === null) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-stone-300" />
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white shrink-0">
      <img src={AVATARS[avatarIndex]} alt="Attendee" className="w-full h-full object-cover" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrePartyPage() {
  const isMobile = useIsMobile()

  const dockGlass: React.CSSProperties = {
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(25px) saturate(180%)',
    WebkitBackdropFilter: 'blur(25px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.6)',
    boxShadow: '0 4px 30px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.8)',
  }

  return (
    // z-[44]: below AppShell's corner (z-47), SideNav (z-50), and TopNav (z-55)
    // so the shared nav components render on top of the PreParty background
    <div
      className="fixed inset-0 z-[44] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fffaf7 0%, #fff1e6 100%)' }}
    >
      {/* ── 3-column content area — starts below header (top-16) and right of sidebar (left-20) ── */}
      <div className="absolute top-16 right-0 bottom-0 flex overflow-hidden" style={{ left: isMobile ? 0 : 80 }}>

        {/* Ambient blobs */}
        <div className="absolute -top-10 right-0 w-[55%] h-[55%] rounded-full pointer-events-none" style={{ background: 'rgba(255,122,47,0.07)', filter: 'blur(120px)' }} />
        <div className="absolute bottom-0 left-0 w-[45%] h-[55%] rounded-full pointer-events-none" style={{ background: 'rgba(251,180,35,0.05)', filter: 'blur(100px)' }} />

        {/* ── Channel sidebar — hidden on mobile ───────────────────────────── */}
        <aside
          className="hidden md:flex w-64 flex-col pt-10 px-6 shrink-0 relative"
          style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderRight: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Community header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-500">Velo</h2>
            <span className="material-symbols-outlined text-stone-400" style={{ fontSize: '16px' }}>expand_more</span>
          </div>

          {/* Channels */}
          <div className="flex-1 space-y-1.5 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {/* Active */}
            <div
              className="flex items-center gap-3 px-3 py-3 rounded-xl font-bold cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,47,0.15) 0%, rgba(194,78,0,0.1) 100%)',
                border: '1px solid rgba(255,122,47,0.2)',
                color: '#9c3f00',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tag</span>
              <span className="text-sm">lobby</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-3 text-stone-500 hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-stone-400" style={{ fontSize: '20px' }}>podcasts</span>
              <span className="text-sm">stage</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-3 text-stone-500 hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-stone-400" style={{ fontSize: '20px' }}>campaign</span>
              <span className="text-sm">announcements</span>
            </div>

            <div className="pt-8 pb-3 px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Community</h3>
            </div>

            <div className="flex items-center gap-3 px-3 py-3 text-stone-500 hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-stone-400" style={{ fontSize: '20px' }}>chat_bubble</span>
              <span className="text-sm">general-chat</span>
            </div>

            <div className="flex items-center gap-3 px-3 py-3 text-stone-500 hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-stone-400" style={{ fontSize: '20px' }}>palette</span>
              <span className="text-sm">design-lab</span>
            </div>
          </div>

          {/* User status */}
          <div className="mt-auto pb-8">
            <div
              className="p-3 rounded-2xl flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.6)' }}
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-[10px] border border-white shadow-sm overflow-hidden">
                  <img src="/profile-pic.jpg" alt="You" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-stone-800">You</span>
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#9c3f00' }}>Online</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Center canvas ─────────────────────────────────────────────────── */}
        <section className="flex-1 flex flex-col overflow-hidden relative min-w-0">
          <div
            className="flex-1 overflow-y-auto px-3 md:px-6 pt-4 md:pt-6 pb-36"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex flex-col items-center space-y-4 w-full">

              {/* Orientation header */}
              <div className="flex items-center justify-between w-full px-1">
                <div>
                  <h2 className="text-[15px] font-black text-stone-800">PreParty Lobby</h2>
                  <p className="text-[12px] text-stone-500 font-medium">Velo · Nova is hosting</p>
                </div>
              </div>

              {/* Stage */}
              <div
                className="relative w-full rounded-[2rem] overflow-hidden shadow-xl"
                style={{
                  aspectRatio: '16/9',
                  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #ddd6fe 100%)',
                  border: '1px solid rgba(167,139,250,0.25)',
                  boxShadow: '0 20px 60px rgba(139,92,246,0.12)',
                }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                  }}
                />

                {/* Session state bar — top of stage */}
                <div className="absolute top-4 left-0 right-0 flex justify-center px-4">
                  <SessionStateBar />
                </div>

                {/* Nova — center stage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <NovaAvatar size={160} />
                  <div className="text-center">
                    <p className="text-[14px] font-black text-violet-700">Nova</p>
                    <p className="text-[11px] font-medium text-violet-500/80">AI Host · BuildParty</p>
                  </div>
                </div>

                {/* Session timeline — bottom of stage */}
                <div className="absolute bottom-4 left-6 right-6">
                  <SessionTimeline />
                </div>
              </div>

              {/* Collaborative Tables */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {TABLES.map((slots, i) => (
                  <div
                    key={i}
                    className="flex justify-center rounded-full px-5 py-2.5 cursor-pointer transition-opacity hover:opacity-80"
                    style={{
                      background: 'rgba(255,255,255,0.4)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.6)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      {slots.map((slot, j) => (
                        <TableSlot key={j} avatarIndex={slot} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Floating Control Dock — unchanged */}
          <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8 z-20 pointer-events-none">
            <div className="flex justify-center items-center gap-2 md:gap-4 pointer-events-auto">

              <button
                className="hidden md:flex rounded-full items-center justify-center gap-0.5 w-20 h-20 transition-all hover:scale-105 active:scale-95 shrink-0"
                style={dockGlass}
              >
                <div className="flex items-center gap-[2px]">
                  <div className="w-[3px] h-3 bg-stone-500 rounded-full" />
                  <div className="w-[3px] h-5 bg-stone-500 rounded-full" />
                  <div className="w-[3px] h-4 bg-stone-500 rounded-full" />
                </div>
                <span
                  className="material-symbols-outlined text-stone-500 ml-0.5"
                  style={{ fontSize: '16px' }}
                >
                  expand_more
                </span>
              </button>

              <div
                className="rounded-[2rem] p-2 md:p-3 flex items-center gap-2 md:gap-3 px-3 md:px-5"
                style={dockGlass}
              >
                <button
                  className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  style={{ background: '#fff7f0', border: '1px solid rgba(255,122,47,0.3)' }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px', color: '#c24e00', fontVariationSettings: "'FILL' 1" }}
                  >
                    mic
                  </span>
                </button>
                <button
                  className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                  style={{ background: '#fff7f0', border: '1px solid rgba(255,122,47,0.3)' }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px', color: '#c24e00', fontVariationSettings: "'FILL' 1" }}
                  >
                    videocam
                  </span>
                </button>
                <button
                  className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
                >
                  <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
                    present_to_all
                  </span>
                </button>
                <button
                  className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
                >
                  <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
                    image
                  </span>
                </button>
                <button
                  className="w-11 h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(209,213,219,0.4)' }}
                >
                  <span className="material-symbols-outlined text-stone-500" style={{ fontSize: '20px' }}>
                    settings
                  </span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── Chat sidebar — hidden on mobile ───────────────────────────────── */}
        <aside
          className="hidden md:flex w-80 flex-col shrink-0"
          style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderLeft: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Tabs */}
          <div className="px-4 border-b border-stone-100/60">
            <div className="flex items-center gap-5 px-2">
              <button className="py-3 text-[14px] font-bold text-stone-900 border-b-2" style={{ borderColor: '#ff6b00' }}>Chat</button>
              <button className="py-3 text-[14px] font-medium text-stone-400 hover:text-stone-700 transition-colors">Q&amp;A</button>
              <button className="py-3 text-[14px] font-medium text-stone-400 hover:text-stone-700 transition-colors">Polls</button>
              <button className="py-3 text-[14px] font-medium text-stone-400 hover:text-stone-700 transition-colors">People</button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-100/40 bg-white/10">
            <button className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-white text-stone-900 shadow-sm border border-stone-100/60">Public</button>
            <button className="px-4 py-1.5 rounded-full text-[11px] font-bold text-stone-500 hover:bg-white/60 transition-colors">Green Room</button>
            <button className="px-4 py-1.5 rounded-full text-[11px] font-bold text-stone-500 hover:bg-white/60 transition-colors">Help</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5" style={{ scrollbarWidth: 'none' }}>
            {MESSAGES.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-white shadow-sm" />
                ) : (
                  <div className={`w-9 h-9 rounded-full ${msg.avatarBg} flex items-center justify-center text-white font-bold text-[12px] shrink-0 shadow-sm`}>
                    {msg.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[13px] font-bold text-stone-900">{msg.name}</span>
                    {msg.isStaff && (
                      <span className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider text-white leading-none" style={{ background: '#ff7a2f' }}>
                        Staff
                      </span>
                    )}
                    <span className="text-[10px] text-stone-400 font-medium ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-[13px] text-stone-700 leading-relaxed">{msg.text}</p>
                  {msg.reactions.length > 0 && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {msg.reactions.map((r, i) => (
                        <button key={i} className="flex items-center gap-1 px-2 py-1 bg-white/60 border border-stone-100 rounded-[8px] text-[11px] hover:bg-white transition-colors">
                          <span>{r.emoji}</span>
                          <span className="font-bold text-stone-600">{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-stone-100/40 bg-white/20">
            <div className="relative bg-white/90 rounded-full px-5 py-3 border border-stone-200/50 flex items-center shadow-sm">
              <input
                type="text"
                placeholder="Type something..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] p-0 placeholder:text-stone-400 font-medium outline-none"
              />
              <button className="ml-3 text-stone-400 hover:text-stone-600 transition-colors">
                <Smiley size={20} weight="bold" />
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
