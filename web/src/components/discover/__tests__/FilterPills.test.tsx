import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FilterPills from '../FilterPills'

describe('FilterPills', () => {
  it('renders all filter labels', () => {
    render(<FilterPills />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('AI Tools')).toBeInTheDocument()
    expect(screen.getByText('Creators')).toBeInTheDocument()
    expect(screen.getByText('Schools')).toBeInTheDocument()
    expect(screen.getByText('Bootcamps')).toBeInTheDocument()
    expect(screen.getByText('Live Now')).toBeInTheDocument()
  })

  it('marks "All" as active by default', () => {
    render(<FilterPills />)
    const allButton = screen.getByText('All')
    expect(allButton.style.border).toContain('rgba(255, 122, 47, 0.3)')
  })
})
