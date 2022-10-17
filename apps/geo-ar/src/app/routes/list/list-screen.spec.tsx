import { render } from '@testing-library/react'
import ListScreen from './list-screen'

describe('ListScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListScreen />)
    expect(baseElement).toBeTruthy()
  })
})
