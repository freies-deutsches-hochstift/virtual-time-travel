import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { CameraStream } from '@virtual-time-travel/camera'
import {
  DeviceFeatures,
  DeviceResponsePermission,
} from '@virtual-time-travel/util-device'
import { selectDialogsContentUrls } from '../store/config.slice'
import { deviceActions, selectCameraPermission } from '../store/device.slice'

export function ArCamera() {
  const dialogsContentUrl = useSelector(selectDialogsContentUrls)
  const requestCameraDialog = useMemo(
    () => dialogsContentUrl[DialogsContentsIds.RequestCamera],
    [dialogsContentUrl]
  )

  const cameraStatus = useSelector(selectCameraPermission)

  const dispatch = useDispatch<Dispatch>()

  /**
   * always wrap props functions into useCallbacks to avoid useless re-renders
   */

  const onRequestCameraComplete = useCallback(
    (res: DeviceResponsePermission) => {
      dispatch(
        deviceActions.handlePermissionEvent({
          permission: DeviceFeatures.Camera,
          ...res,
        })
      )
    },
    [dispatch]
  )

  return (
    <CameraStream
      {...{
        onRequestCameraComplete,
        requestCameraDialog,
        devicePermissionsStatus: [cameraStatus],
      }}
    />
  )
}

export default ArCamera
