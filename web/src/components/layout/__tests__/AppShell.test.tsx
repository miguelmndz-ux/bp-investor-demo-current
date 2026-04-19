import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// vi.mock is hoisted before imports by Vitest — put it before component import
vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

import AppShell from '../AppShell'
import { useIsMobile } from '@/hooks/useIsMobile'

describe('AppShell', () => {
  beforeEach(() => {
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('renders children inside the main content area', () => {
    render(<AppShell><div data-testid="child-content">Hello</div></AppShell>)
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('renders the BuildParty wordmark from TopNav', () => {
    render(<AppShell><div /></AppShell>)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })

  it('renders BottomNav on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<AppShell><div /></AppShell>)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
  })
})
