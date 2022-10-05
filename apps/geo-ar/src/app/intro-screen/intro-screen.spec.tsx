import { render } from '@testing-library/react'
import IntroScreen from './intro-screen'

describe('IntroScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntroScreen />)
    expect(baseElement).toBeTruthy()
  })
})
