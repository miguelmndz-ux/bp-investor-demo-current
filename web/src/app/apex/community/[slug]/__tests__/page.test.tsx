import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/navigation — default to velo
const mockParams = { slug: 'velo' }
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => mockParams,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

import CommunityPage from '../page'

describe('CommunityPage', () => {
  it('renders Velo community profile', () => {
    mockParams.slug = 'velo'
    render(<CommunityPage />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText(/Async video messaging/)).toBeInTheDocument()
  })

  it('renders back button', () => {
    mockParams.slug = 'velo'
    render(<CommunityPage />)
    const backLink = screen.getByRole('link', { name: /Back to Apex/i })
    expect(backLink).toHaveAttribute('href', '/apex')
  })

  it('renders Coming Soon for products without full profiles', () => {
    mockParams.slug = 'flint'
    render(<CommunityPage />)
    expect(screen.getByText(/still building this community profile/i)).toBeInTheDocument()
  })
})
