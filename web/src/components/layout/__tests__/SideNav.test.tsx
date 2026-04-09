import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SideNav from '../SideNav'

describe('SideNav', () => {
  it('renders the home nav link', () => {
    render(<SideNav />)
    expect(screen.getByTitle('Home')).toBeInTheDocument()
  })
  it('renders community avatars', () => {
    render(<SideNav />)
    expect(screen.getByTitle('Nate Herk')).toBeInTheDocument()
    expect(screen.getByTitle('LiveKit')).toBeInTheDocument()
  })
})
