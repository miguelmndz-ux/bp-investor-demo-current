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
    expect(screen.getByText('Constellation')).toBeInTheDocument()
  })

  it('renders the page subtitle', () => {
    render(<AgentsPage />)
    expect(screen.getByText('Five agents, one live operating layer in BuildParty')).toBeInTheDocument()
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
