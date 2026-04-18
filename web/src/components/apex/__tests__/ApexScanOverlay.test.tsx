import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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
    expect(screen.getByText('Apex is running\u2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  })

  it('shows all phase names when scanning', () => {
    render(<ApexScanOverlay />)
    expect(screen.getAllByText('Scanning Product Hunt top 10').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Enriching founder profiles').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Running Decode skill').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Running Rapid Course skill').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Drafting outreach messages').length).toBeGreaterThan(0)
  })
})
