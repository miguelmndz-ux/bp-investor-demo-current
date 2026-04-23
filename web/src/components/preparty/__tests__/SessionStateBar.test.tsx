import { render, screen } from '@testing-library/react'
import { SessionStateBar } from '../SessionStateBar'

describe('SessionStateBar', () => {
  it('renders the Live label', () => {
    render(<SessionStateBar />)
    expect(screen.getByText('Live')).toBeInTheDocument()
  })

  it('renders the Up Next label', () => {
    render(<SessionStateBar />)
    expect(screen.getByText('Up Next')).toBeInTheDocument()
  })

  it('renders the Starting Soon label', () => {
    render(<SessionStateBar />)
    expect(screen.getByText('Starting Soon')).toBeInTheDocument()
  })

  it('renders the live segment name', () => {
    render(<SessionStateBar />)
    expect(screen.getByText('Nova: PreParty Lobby')).toBeInTheDocument()
  })

  it('renders the countdown for the starting-soon segment', () => {
    render(<SessionStateBar />)
    expect(screen.getByText('12:00')).toBeInTheDocument()
  })
})
