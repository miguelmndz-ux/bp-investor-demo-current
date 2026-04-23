import { render, screen } from '@testing-library/react'
import { SessionTimeline } from '../SessionTimeline'

describe('SessionTimeline', () => {
  it('renders elapsed time', () => {
    render(<SessionTimeline elapsed="14:32" total="45:00" />)
    expect(screen.getByText('14:32')).toBeInTheDocument()
  })

  it('renders total duration', () => {
    render(<SessionTimeline elapsed="14:32" total="45:00" />)
    expect(screen.getByText('45:00')).toBeInTheDocument()
  })

  it('renders default values when no props provided', () => {
    render(<SessionTimeline />)
    expect(screen.getByText('14:32')).toBeInTheDocument()
    expect(screen.getByText('45:00')).toBeInTheDocument()
  })
})
