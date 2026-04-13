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
    expect(screen.getByText('ElevenLabs')).toBeInTheDocument()
    expect(screen.getByText('Cerebral Valley')).toBeInTheDocument()
    expect(screen.getByText('The AI Collective')).toBeInTheDocument()
  })

  it('renders owner names', () => {
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={() => {}} />)
    expect(screen.getByText('by Mati Staniszewski')).toBeInTheDocument()
  })

  it('calls onSelect when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<FeaturedCommunities communities={featuredCommunities} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('ElevenLabs'))
    expect(onSelect).toHaveBeenCalledWith(featuredCommunities[0])
  })
})
