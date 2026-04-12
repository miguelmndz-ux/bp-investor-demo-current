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
    expect(screen.getByText('NovaVoice Live: Build with TTS in SF')).toBeInTheDocument()
    expect(screen.getByText('Encode AI London Hackathon')).toBeInTheDocument()
  })

  it('renders session hosts', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('by Rustam Khasanov')).toBeInTheDocument()
  })

  it('renders badge labels', () => {
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={() => {}} />)
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<SessionCarousel title="Trending Today" sessions={trendingSessions} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('NovaVoice Live: Build with TTS in SF'))
    expect(onSelect).toHaveBeenCalledWith(trendingSessions[0])
  })
})
