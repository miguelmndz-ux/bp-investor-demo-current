export interface SessionBadge {
  label: string
  type: 'live' | 'upcoming' | 'date'
}

export interface DiscoverSession {
  id: string
  title: string
  host: string
  image: string
  badge: SessionBadge
  date: string
  duration: string
  attendees: number
  programName: string
  description: string
}

export interface ProgramSession {
  title: string
  date: string
  image: string
}

export interface DiscoverProgram {
  id: string
  title: string
  owner: string
  image: string
  sessionCount: number
  startDate: string
  enrolled: number
  description: string
  reward: string
  sessions: ProgramSession[]
}

export interface CommunityProgram {
  name: string
  status: string
  image: string
}

export interface DiscoverCommunity {
  id: string
  name: string
  owner: string
  image: string
  thumbnail: string
  members: string
  programCount: number
  sessionsThisMonth: number
  description: string
  programs: CommunityProgram[]
}
