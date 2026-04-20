import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentCard from '../AgentCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

const baseProps = {
  name: 'Nova',
  description: 'Orchestrates every live session.',
  gradientFrom: '#f59e0b',
  gradientTo: '#d97706',
  glowColor: 'rgba(245,158,11,0.35)',
}

describe('AgentCard', () => {
  it('renders agent name and description', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.getByText('Nova')).toBeInTheDocument()
    expect(screen.getByText('Orchestrates every live session.')).toBeInTheDocument()
  })

  it('does not render as a link when no href provided', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<AgentCard {...baseProps} href="/apex" />)
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/apex')
  })
})
