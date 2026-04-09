import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LiveStatsPanel from '../LiveStatsPanel'

describe('LiveStatsPanel', () => {
  it('renders the Live Stats heading', () => {
    render(<LiveStatsPanel />)
    expect(screen.getByText('Live Stats')).toBeInTheDocument()
  })
  it('renders the upvote velocity stat', () => {
    render(<LiveStatsPanel />)
    expect(screen.getByText(/\+31 upvotes per hour/)).toBeInTheDocument()
  })
})
