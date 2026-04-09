import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentWorkflowLog from '../AgentWorkflowLog'
import { workflowLog } from '@/lib/fixtures/workflowLog'

describe('AgentWorkflowLog', () => {
  it('renders the Agent Workflow heading', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText('Agent Workflow')).toBeInTheDocument()
  })
  it('renders the pending item', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText('Awaiting Approval: 8 Drafts')).toBeInTheDocument()
  })
  it('renders all log items', () => {
    render(<AgentWorkflowLog items={workflowLog} />)
    expect(screen.getByText(/Scanned PH top 10/)).toBeInTheDocument()
    expect(screen.getByText(/Extracted founder data/)).toBeInTheDocument()
  })
})
