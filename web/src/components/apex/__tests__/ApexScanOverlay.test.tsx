import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import { render, screen, fireEvent, act } from '@testing-library/react'
import ApexScanOverlay from '../ApexScanOverlay'

describe('ApexScanOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('shows ready state on mount — not scanning', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByText('Ready to run Apex?')).toBeInTheDocument()
    expect(screen.queryByText(/Apex is running/)).not.toBeInTheDocument()
  })

  it('shows Run Apex button in ready state', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByRole('button', { name: 'Run Apex' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument()
  })

  it('shows all five phase names in ready state', () => {
    render(<ApexScanOverlay />)
    expect(screen.getAllByText('Scanning Product Hunt top 10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Enriching founder profiles').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Creating community profile pages').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Running Decode and Course skills').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Drafting outreach messages').length).toBeGreaterThan(0)
  })

  it('transitions to scanning when Run Apex is clicked', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    act(() => { vi.advanceTimersByTime(300) })
    expect(screen.getByText(/Apex is running/)).toBeInTheDocument()
    expect(screen.queryByText('Ready to run Apex?')).not.toBeInTheDocument()
  })

  it('shows Stop button after Run Apex is clicked', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    act(() => { vi.advanceTimersByTime(300) })
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  })
})
