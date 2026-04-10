export type CommunityType = 'creator' | 'community'

export interface Community {
  name: string
  href: string
  avatar: string
  type: CommunityType
}

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
