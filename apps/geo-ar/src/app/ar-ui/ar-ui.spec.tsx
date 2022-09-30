import { render } from '@testing-library/react'
import ArUi from './ar-ui'

describe('ArUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArUi />)
    expect(baseElement).toBeTruthy()
  })
})
