import { render } from '@testing-library/react'
import MenuScreen from './menu-screen'

describe('MenuScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MenuScreen />)
    expect(baseElement).toBeTruthy()
  })
})
