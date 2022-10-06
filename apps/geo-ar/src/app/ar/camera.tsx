
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { CameraStream } from '@virtual-time-travel/camera'
import { DeviceFeatures, DeviceResponsePermission } from '@virtual-time-travel/util-device'
import { deviceActions, selectCameraPermission } from '../../store/device.slice'
import { selectCurrentLocale } from '../../store/locales.slice'



export function ArCamera() {

  const locale = useSelector(selectCurrentLocale)
  const cameraStatus = useSelector(selectCameraPermission)

  const dispatch = useDispatch<Dispatch>()

  /**
   * always wrap props functions into useCallbacks to avoid useless re-renders
   */


  const onRequestCameraComplete = useCallback((res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Camera, ...res }))
  }, [dispatch])

  return (
    <CameraStream {...{ onRequestCameraComplete, locale, devicePermissionsStatus: [cameraStatus] }} />
  )
}

export default ArCamera
