import type { WorkflowLogItem } from './types'

export const workflowLog: WorkflowLogItem[] = [
  { id: '1', icon: 'search_check',    label: 'Scanned PH top 10 — April 8',              timestamp: '2 mins ago',   status: 'done' },
  { id: '2', icon: 'edit_note',       label: 'Drafted outreach for Ajay Kumar (Velo)',    timestamp: '15 mins ago',  status: 'done' },
  { id: '3', icon: 'pending_actions', label: 'Awaiting Approval: 8 Drafts',               timestamp: '1 hour ago',   status: 'pending' },
  { id: '4', icon: 'analytics',       label: 'Analyzed landing page for Flint',           timestamp: '2 hours ago',  status: 'done' },
  { id: '5', icon: 'manage_search',   label: 'Extracted founder data for MindsDB',        timestamp: '3 hours ago',  status: 'done' },
]
