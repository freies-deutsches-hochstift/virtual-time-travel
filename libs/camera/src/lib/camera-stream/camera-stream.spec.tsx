import { render } from '@testing-library/react'
import { PermissionStatus } from '@virtual-time-travel/util-device'
import { CameraStream } from './camera-stream'

describe('CameraStream', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CameraStream {...{ locale: 'de', devicePermissionsStatus: [PermissionStatus.Unknown] }} />)
    expect(baseElement).toBeTruthy()
  })
})
