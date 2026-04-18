import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TrendingPrograms from '../TrendingPrograms'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'

describe('TrendingPrograms', () => {
  it('renders the section title', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('Trending Programs')).toBeInTheDocument()
  })

  it('renders program titles', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('The AI Engineering Bootcamp')).toBeInTheDocument()
    expect(screen.getByText('AI Product Management Certification')).toBeInTheDocument()
  })

  it('renders program owners', () => {
    render(<TrendingPrograms programs={trendingPrograms} onSelect={() => {}} />)
    expect(screen.getByText('Dr. Greg Loughnane & Chris Alexiuk')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<TrendingPrograms programs={trendingPrograms} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('The AI Engineering Bootcamp'))
    expect(onSelect).toHaveBeenCalledWith(trendingPrograms[0])
  })
})
