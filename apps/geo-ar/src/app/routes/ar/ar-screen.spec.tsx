import { render } from '@testing-library/react'
import ArScreen from './ar-screen'

describe('ArScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArScreen />)
    expect(baseElement).toBeTruthy()
  })
})
