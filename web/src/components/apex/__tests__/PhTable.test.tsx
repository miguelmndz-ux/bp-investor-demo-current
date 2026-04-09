import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhTable from '../PhTable'
import { phProducts } from '@/lib/fixtures/products'

describe('PhTable', () => {
  it('renders the section heading', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('ProductHunt Top 10')).toBeInTheDocument()
  })
  it('renders a row for each product', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText('FeatDrop')).toBeInTheDocument()
  })
  it('renders vote counts', () => {
    render(<PhTable products={phProducts} />)
    expect(screen.getByText('617')).toBeInTheDocument()
  })
})
