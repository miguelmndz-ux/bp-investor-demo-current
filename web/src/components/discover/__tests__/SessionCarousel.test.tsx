import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SessionCarousel from '../SessionCarousel'
import { trendingSessions } from '@/lib/fixtures/discover-sessions'

describe('SessionCarousel', () => {
  it('renders the section title', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('Trending Today')).toBeInTheDocument()
  })

  it('renders session titles', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('ElevenLabs x Lovable Workshop + Hackathon')).toBeInTheDocument()
    expect(screen.getByText('Flower AI Summit 2026')).toBeInTheDocument()
  })

  it('renders session hosts', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('by Nir Naamani & Jonathan Chang')).toBeInTheDocument()
  })

  it('renders badge labels', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('ElevenLabs x Lovable Workshop + Hackathon'))
    expect(onSelect).toHaveBeenCalledWith(trendingSessions[0])
  })
})
