import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroCard from '../HeroCard'

describe('HeroCard', () => {
  it('renders the outreach count headline', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByText(/10 new/)).toBeInTheDocument()
  })
  it('renders the Review Drafts button', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByRole('button', { name: /Review Drafts/i })).toBeInTheDocument()
  })
  it('renders the scan count', () => {
    render(<HeroCard draftCount={10} />)
    expect(screen.getByText(/420\+/)).toBeInTheDocument()
  })
})
