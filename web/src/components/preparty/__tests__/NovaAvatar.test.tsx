import { render } from '@testing-library/react'
import { NovaAvatar } from '../NovaAvatar'

describe('NovaAvatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<NovaAvatar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies the size prop to the wrapper', () => {
    const { container } = render(<NovaAvatar size={240} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ width: '240px', height: '240px' })
  })
})
