import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import PrePartyPage from '../page'

vi.mock('@/hooks/useIsMobile', () => ({ useIsMobile: () => false }))

describe('PrePartyPage', () => {
  it('renders the orientation header', () => {
    render(<PrePartyPage />)
    expect(screen.getByText('PreParty Lobby')).toBeInTheDocument()
  })

  it('renders the Live session state badge', () => {
    render(<PrePartyPage />)
    expect(screen.getByText('Live')).toBeInTheDocument()
  })

  it('renders the session timeline elapsed time', () => {
    render(<PrePartyPage />)
    expect(screen.getByText('14:32')).toBeInTheDocument()
  })

  it('renders the Nova host label', () => {
    render(<PrePartyPage />)
    expect(screen.getByText('Nova')).toBeInTheDocument()
  })
})
