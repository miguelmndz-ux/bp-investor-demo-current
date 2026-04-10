import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommunityProfile from '../CommunityProfile'
import type { PhProduct } from '@/lib/fixtures/types'

const mockProduct: PhProduct = {
  name: 'Velo',
  slug: 'velo',
  category: 'Video Messaging',
  votes: 617,
  comments: 143,
  score: 103,
  logo: 'https://example.com/logo.png',
  tagline: 'Async video messaging that feels like being in the room',
  briefOverview: 'Velo lets teams send rich async video messages.',
  description: 'Velo reimagines async communication for modern teams.',
  images: ['https://example.com/img1.png'],
  makerName: 'Ajay Kumar',
  decodeUrl: '/apex/velo-decode.html',
  rapidCourseUrl: '/apex/velo-rapidcourse.html',
}

const mockFounder = {
  name: 'Ajay Kumar',
  role: 'Maker, Velo',
  quote: 'Video is the most human form of async communication.',
  avatar: 'https://example.com/avatar.png',
}

describe('CommunityProfile', () => {
  it('renders product name, tagline, and category', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Velo')).toBeInTheDocument()
    expect(screen.getByText('Async video messaging that feels like being in the room')).toBeInTheDocument()
    expect(screen.getByText('Video Messaging')).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('617')).toBeInTheDocument()
    expect(screen.getByText('143')).toBeInTheDocument()
    expect(screen.getByText('103')).toBeInTheDocument()
  })

  it('renders founder card', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Ajay Kumar')).toBeInTheDocument()
    expect(screen.getByText('Maker, Velo')).toBeInTheDocument()
  })

  it('renders description and preview cards', () => {
    render(<CommunityProfile product={mockProduct} founder={mockFounder} />)
    expect(screen.getByText('Velo reimagines async communication for modern teams.')).toBeInTheDocument()
    expect(screen.getByText('Apex Decode')).toBeInTheDocument()
    expect(screen.getByText('Apex Rapid Course')).toBeInTheDocument()
  })
})
