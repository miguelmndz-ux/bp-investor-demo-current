import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DiscoverPage from '@/app/discover/page'

describe('DiscoverPage', () => {
  it('renders all section headers', () => {
    render(<DiscoverPage />)
    expect(screen.getByText('Trending Programs')).toBeInTheDocument()
    expect(screen.getByText('Trending Today')).toBeInTheDocument()
    expect(screen.getByText('Upcoming This Week')).toBeInTheDocument()
    expect(screen.getByText('Featured Communities')).toBeInTheDocument()
  })

  it('renders filter pills', () => {
    render(<DiscoverPage />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getAllByText('Live Now').length).toBeGreaterThanOrEqual(1)
  })
})
