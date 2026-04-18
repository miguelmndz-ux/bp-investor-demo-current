import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DecodePreviewCard from '../DecodePreviewCard'

describe('DecodePreviewCard', () => {
  it('renders the card title and description', () => {
    render(
      <DecodePreviewCard
        productName="Velo"
        description="A deep-dive analysis of Velo's product strategy and technology."
        decodeUrl="/apex/velo-decode.html"
      />
    )
    expect(screen.getByText('Apex Decode')).toBeInTheDocument()
    expect(screen.getByText('Velo — Deep Dive')).toBeInTheDocument()
    expect(screen.getByText("A deep-dive analysis of Velo's product strategy and technology.")).toBeInTheDocument()
  })

  it('renders the View Decode link pointing to the correct URL', () => {
    render(
      <DecodePreviewCard
        productName="Velo"
        description="A deep-dive analysis."
        decodeUrl="/apex/velo-decode.html"
      />
    )
    const link = screen.getByRole('link', { name: /View Decode/i })
    expect(link).toHaveAttribute('href', '/apex/velo-decode.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
