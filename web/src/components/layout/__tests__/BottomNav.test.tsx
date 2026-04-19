import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BottomNav from '../BottomNav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/discover',
}))

describe('BottomNav', () => {
  it('renders all four nav items', () => {
    render(<BottomNav />)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
    expect(screen.getByLabelText('Discover')).toBeInTheDocument()
    expect(screen.getByLabelText('Calendar')).toBeInTheDocument()
    expect(screen.getByLabelText('Apex')).toBeInTheDocument()
  })

  it('marks the active route with aria-current', () => {
    render(<BottomNav />)
    expect(screen.getByLabelText('Discover').closest('a')).toHaveAttribute('aria-current', 'page')
  })

  it('renders as a fixed bottom bar', () => {
    const { container } = render(<BottomNav />)
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('fixed')
    expect(nav?.className).toContain('bottom-0')
  })
})
