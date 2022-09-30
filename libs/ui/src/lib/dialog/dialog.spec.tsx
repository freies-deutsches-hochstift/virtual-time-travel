import { render } from '@testing-library/react'

import Dialog from './dialog'

describe('Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dialog {...{
      title: "Dialog title",
      content: "<p>Hello dialog</p>",
      onConfirm: () => console.log('Dialog onConfirm'),
      onCancel: () => console.log('Dialog onCancel')
    }} />)
    expect(baseElement).toBeTruthy()
  })
})
