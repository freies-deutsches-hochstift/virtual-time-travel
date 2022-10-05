import { render } from '@testing-library/react'
import QrScreen from './qr-screen'

describe('QrScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QrScreen />)
    expect(baseElement).toBeTruthy()
  })
})
