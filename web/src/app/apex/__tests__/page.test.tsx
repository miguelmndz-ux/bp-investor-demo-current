import { describe, it, expect, vi } from 'vitest'

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import { render, screen } from '@testing-library/react'
import ApexPage from '../page'

describe('ApexPage', () => {
  it('renders the hero headline', () => {
    render(<ApexPage />)
    expect(screen.getByText(/Apex has drafted/)).toBeInTheDocument()
  })
  it('renders the PH Top 10 section', () => {
    render(<ApexPage />)
    expect(screen.getByText('ProductHunt Top 10')).toBeInTheDocument()
  })
  it('renders the Live Stats panel', () => {
    render(<ApexPage />)
    expect(screen.getByText('Live Stats')).toBeInTheDocument()
  })
  it('renders the Agent Workflow log', () => {
    render(<ApexPage />)
    expect(screen.getByText('Agent Workflow')).toBeInTheDocument()
  })
})
