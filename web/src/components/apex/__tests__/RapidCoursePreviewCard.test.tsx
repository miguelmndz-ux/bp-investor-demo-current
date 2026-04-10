import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RapidCoursePreviewCard from '../RapidCoursePreviewCard'

describe('RapidCoursePreviewCard', () => {
  it('renders the card title and description', () => {
    render(
      <RapidCoursePreviewCard
        productName="Velo"
        description="A hands-on microcourse covering Velo's core workflows."
        rapidCourseUrl="/apex/velo-rapidcourse.html"
      />
    )
    expect(screen.getByText('Apex Rapid Course')).toBeInTheDocument()
    expect(screen.getByText('Velo — Microcourse')).toBeInTheDocument()
    expect(screen.getByText("A hands-on microcourse covering Velo's core workflows.")).toBeInTheDocument()
  })

  it('renders the View Course link pointing to the correct URL', () => {
    render(
      <RapidCoursePreviewCard
        productName="Velo"
        description="A hands-on microcourse."
        rapidCourseUrl="/apex/velo-rapidcourse.html"
      />
    )
    const link = screen.getByRole('link', { name: /View Course/i })
    expect(link).toHaveAttribute('href', '/apex/velo-rapidcourse.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
