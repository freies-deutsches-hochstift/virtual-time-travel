import { render } from '@testing-library/react'
import GeoDebug from './debug'

describe('GeoDebug', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GeoDebug {...{
      position: {
        coords: [50.2735375, 8.6497465],
        accuracy: 16.184
      }, orientation: null
    }} />)
    expect(baseElement).toBeTruthy()
  })
})
