export type CommunityType = 'creator' | 'community'

export interface Community {
  name: string
  href: string
  avatar: string
  type: CommunityType
}

export type LifecycleStatus = 'pending' | 'draft_sent' | 'signed_up' | 'session_confirmed'

export interface PhProduct {
  name: string
  slug: string
  category: string
  votes: number
  comments: number
  score: number
  logo: string
  tagline: string | null
  briefOverview: string | null
  description: string | null
  images: string[]
  makerName: string | null
  decodeUrl: string | null
  rapidCourseUrl: string | null
  lifecycleStatus: LifecycleStatus
}

export interface Founder {
  name: string
  role: string
  quote: string
  avatar: string
}

export type WorkflowStatus = 'done' | 'pending'

export interface WorkflowLogItem {
  id: string
  icon: string
  label: string
  timestamp: string
  status: WorkflowStatus
}
