import { render } from '@testing-library/react'
import PovDetails from './pov-details'

describe('PovDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PovDetails />)
    expect(baseElement).toBeTruthy()
  })
})
