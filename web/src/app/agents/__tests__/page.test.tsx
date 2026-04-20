import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentsPage from '../page'

vi.mock('@/components/agents/AgentCard', () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid="agent-card">{name}</div>
  ),
}))

describe('AgentsPage', () => {
  it('renders the page headline', () => {
    render(<AgentsPage />)
    expect(screen.getByText('The Constellation')).toBeInTheDocument()
  })

  it('renders the eyebrow label', () => {
    render(<AgentsPage />)
    expect(screen.getByText('BuildParty Agents')).toBeInTheDocument()
  })

  it('renders five agent cards', () => {
    render(<AgentsPage />)
    expect(screen.getAllByTestId('agent-card')).toHaveLength(5)
  })

  it('renders all agent names', () => {
    render(<AgentsPage />)
    for (const name of ['Nova', 'Echo', 'Orbit', 'Flare', 'Apex']) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })
})
