import { render } from '@testing-library/react'
import { PermissionStatus } from '@virtual-time-travel/util-device'
import { QrReader } from './qr-reader'

describe('QrReader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QrReader {...{
      onReadQr: (text) => { console.log(text) },
      onRequestCameraComplete: (res) => console.log('REQUEST CAMERA', res),
      requestCameraDialog: '/assets/items/dialogs/locales/de/request-camera.md', devicePermissionsStatus: [PermissionStatus.Unknown]
    }} />)
    expect(baseElement).toBeTruthy()
  })
})
