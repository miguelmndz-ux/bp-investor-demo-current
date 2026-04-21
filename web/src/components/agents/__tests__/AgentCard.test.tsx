import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AgentCard from '../AgentCard'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

vi.mock('@phosphor-icons/react', () => ({
  Microphone: () => <svg data-testid="icon-microphone" />,
  Brain: () => <svg data-testid="icon-brain" />,
  Code: () => <svg data-testid="icon-code" />,
  Sparkle: () => <svg data-testid="icon-sparkle" />,
  RocketLaunch: () => <svg data-testid="icon-rocketlaunch" />,
}))

const baseProps = {
  name: 'Nova',
  role: 'Session Host',
  iconName: 'Microphone' as const,
  accentColor: '#7c3aed',
  accentRgb: [124, 58, 237] as [number, number, number],
  accentDarkRgb: [91, 33, 182] as [number, number, number],
  imageBlend: 'lighten' as const,
}

describe('AgentCard', () => {
  it('renders agent name and role', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.getByText('Nova')).toBeInTheDocument()
    expect(screen.getByText('Session Host')).toBeInTheDocument()
  })

  it('renders the mascot image', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.getByAltText('Nova')).toBeInTheDocument()
  })

  it('links to agent slug by default', () => {
    render(<AgentCard {...baseProps} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/agents/nova')
  })

  it('links to custom href when provided', () => {
    render(<AgentCard {...baseProps} href="/apex" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/apex')
  })
})
