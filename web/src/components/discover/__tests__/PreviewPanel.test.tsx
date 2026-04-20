import { describe, it, expect, vi } from 'vitest'

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

import { render, screen } from '@testing-library/react'
import PreviewPanel from '../PreviewPanel'
import { trendingSessions } from '@/lib/fixtures/discover-sessions'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'

describe('PreviewPanel', () => {
  it('renders session preview when type is session', () => {
    render(<PreviewPanel type="session" data={trendingSessions[0]} open onClose={() => {}} />)
    expect(screen.getByText('Session')).toBeInTheDocument()
    expect(screen.getByText('ElevenLabs x Lovable Workshop + Hackathon')).toBeInTheDocument()
    expect(screen.getByText('by Nir Naamani & Jonathan Chang')).toBeInTheDocument()
    expect(screen.getByText('Join Session')).toBeInTheDocument()
  })

  it('renders program preview when type is program', () => {
    render(<PreviewPanel type="program" data={trendingPrograms[0]} open onClose={() => {}} />)
    expect(screen.getByText('Program')).toBeInTheDocument()
    expect(screen.getByText('The AI Engineering Bootcamp')).toBeInTheDocument()
    expect(screen.getByText('Enroll in Program')).toBeInTheDocument()
  })

  it('renders community preview when type is community', () => {
    render(<PreviewPanel type="community" data={featuredCommunities[0]} open onClose={() => {}} />)
    expect(screen.getByText('Community')).toBeInTheDocument()
    expect(screen.getByText('ElevenLabs')).toBeInTheDocument()
    expect(screen.getByText('Join Community')).toBeInTheDocument()
  })

  it('renders detail rows for programs', () => {
    render(<PreviewPanel type="program" data={trendingPrograms[0]} open onClose={() => {}} />)
    expect(screen.getByText(/sessions/)).toBeInTheDocument()
    expect(screen.getByText(/enrolled/)).toBeInTheDocument()
  })

  it('renders detail rows for communities', () => {
    render(<PreviewPanel type="community" data={featuredCommunities[0]} open onClose={() => {}} />)
    expect(screen.getByText(/members/)).toBeInTheDocument()
    expect(screen.getByText(/active programs/)).toBeInTheDocument()
  })

  it('does not render content when data is null', () => {
    render(<PreviewPanel type={null} data={null} open={false} onClose={() => {}} />)
    expect(screen.queryByText('Session')).not.toBeInTheDocument()
    expect(screen.queryByText('Program')).not.toBeInTheDocument()
    expect(screen.queryByText('Community')).not.toBeInTheDocument()
  })
})
