import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNav from '../TopNav'

describe('TopNav', () => {
  it('renders the BuildParty wordmark', () => {
    render(<TopNav />)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })
  it('renders the search input', () => {
    render(<TopNav />)
    expect(screen.getByPlaceholderText('Search insights, founders, or drafts…')).toBeInTheDocument()
  })
})
