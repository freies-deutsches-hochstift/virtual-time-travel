import { render } from '@testing-library/react'
import SplashScreen from './splash-screen'

describe('SplashScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SplashScreen />)
    expect(baseElement).toBeTruthy()
  })
})
