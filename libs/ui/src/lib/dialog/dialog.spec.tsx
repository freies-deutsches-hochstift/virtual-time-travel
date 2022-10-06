import { render } from '@testing-library/react'
import Dialog from './dialog'

describe('Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dialog {...{
      onConfirm: () => console.log('Dialog onConfirm'),
      onCancel: () => console.log('Dialog onCancel'),
      contentId: 'geolocation',
      locale: 'de'
    }} />)
    expect(baseElement).toBeTruthy()
  })
})
