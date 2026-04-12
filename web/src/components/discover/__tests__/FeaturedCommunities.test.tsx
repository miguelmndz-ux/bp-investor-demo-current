import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FeaturedCommunities from '../FeaturedCommunities'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'

describe('FeaturedCommunities', () => {
  it('renders the section title', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('Featured Communities')).toBeInTheDocument()
  })

  it('renders community names', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('Voice Builders')).toBeInTheDocument()
    expect(screen.getByText('AI Collective')).toBeInTheDocument()
    expect(screen.getByText('Prompt Engineers')).toBeInTheDocument()
  })

  it('renders owner names', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('by ElevenLabs')).toBeInTheDocument()
  })

  it('renders member counts', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText(/2\.4k members/)).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Voice Builders'))
    expect(onSelect).toHaveBeenCalledWith(featuredCommunities[0])
  })
})
