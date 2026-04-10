import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ApexScanOverlay from '../ApexScanOverlay'

describe('ApexScanOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('renders idle state on mount', () => {
    render(<ApexScanOverlay />)
    expect(screen.getByText('Ready to run Apex?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Run Apex' })).toBeInTheDocument()
  })

  it('shows scanning headline after clicking Run Apex', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByText('Apex is running\u2026')).toBeInTheDocument()
  })

  it('shows all five phase names when scanning', () => {
    render(<ApexScanOverlay />)
    fireEvent.click(screen.getByRole('button', { name: 'Run Apex' }))
    expect(screen.getByText('Scanning Product Hunt top 10')).toBeInTheDocument()
    expect(screen.getByText('Enriching founder profiles')).toBeInTheDocument()
    expect(screen.getByText('Running Decode skill')).toBeInTheDocument()
    expect(screen.getByText('Running Rapid Course skill')).toBeInTheDocument()
    expect(screen.getByText('Drafting outreach messages')).toBeInTheDocument()
  })
})
