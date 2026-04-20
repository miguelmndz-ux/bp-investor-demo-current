import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import { render, screen } from '@testing-library/react'
import ApexScanOverlay from '../ApexScanOverlay'

describe('ApexScanOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('renders scanning headline on mount', () => {
    render(<ApexScanOverlay />)
    expect(screen.getAllByText('Apex is running\u2026').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  })

  it('shows all phase names when scanning', () => {
    render(<ApexScanOverlay />)
    expect(screen.getAllByText('Scanning Product Hunt top 10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Enriching founder profiles').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Creating community profile pages').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Running Decode and Course skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Drafting outreach messages').length).toBeGreaterThan(0)
  })
})
