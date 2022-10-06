
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { CameraStream } from '@virtual-time-travel/camera'
import { DeviceFeatures, DeviceResponsePermission } from '@virtual-time-travel/util-device'
import { deviceActions } from '../state/device.slice'
// import { selectCurrentLocale } from '../state/locales.slice'




export function ArCamera() {

  // const locale = useSelector(selectCurrentLocale)

  const dispatch = useDispatch<Dispatch>()

  const onRequestCameraComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Camera, ...res }))
  }

  return (
    <CameraStream {...{ onRequestCameraComplete }} />
  )
}

export default ArCamera
