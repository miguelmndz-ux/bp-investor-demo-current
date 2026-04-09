import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AppShell from '../AppShell'

describe('AppShell', () => {
  it('renders children inside the main content area', () => {
    render(<AppShell><div data-testid="child-content">Hello</div></AppShell>)
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })
  it('renders the BuildParty wordmark from TopNav', () => {
    render(<AppShell><div /></AppShell>)
    expect(screen.getByText('BuildParty')).toBeInTheDocument()
  })
})
