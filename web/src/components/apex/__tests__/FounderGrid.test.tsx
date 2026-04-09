import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FounderGrid from '../FounderGrid'
import { founders } from '@/lib/fixtures/founders'

describe('FounderGrid', () => {
  it('renders a card for each founder', () => {
    render(<FounderGrid founders={founders} />)
    expect(screen.getByText('Ajay Kumar')).toBeInTheDocument()
    expect(screen.getByText('Allan Jiang')).toBeInTheDocument()
  })
  it('renders outreach draft buttons', () => {
    render(<FounderGrid founders={founders} />)
    const buttons = screen.getAllByRole('button', { name: /Outreach Draft/i })
    expect(buttons).toHaveLength(founders.length)
  })
})
