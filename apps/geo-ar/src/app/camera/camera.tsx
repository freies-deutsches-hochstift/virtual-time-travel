import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { OnDecodeQr } from '@virtual-time-travel/app-router'
import { CameraStream } from '@virtual-time-travel/camera'
import { Dialog } from '@virtual-time-travel/ui'
import {
  DeviceFeatures,
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'
import { selectDialogsContentUrls } from '../store/config.slice'
import { deviceActions, selectCameraPermission } from '../store/device.slice'


export interface CameraProps {
  onDecodeQr?: OnDecodeQr
}


export const Camera = memo(({ onDecodeQr }: CameraProps) => {
  const dispatch = useDispatch<Dispatch>()

  const dialogsContentUrl = useSelector(selectDialogsContentUrls)
  const cameraStatus = useSelector(selectCameraPermission)

  const requestCameraDialog = useMemo(
    () => dialogsContentUrl[DialogsContentsIds.RequestCamera],
    [dialogsContentUrl]
  )

  const cameraUnavailableDialog = useMemo(
    () => dialogsContentUrl[DialogsContentsIds.CameraUnavailable],
    [dialogsContentUrl]
  )

  const isCameraUnavailable = useMemo(() => {
    return (
      cameraStatus === PermissionStatus.Denied ||
      cameraStatus === PermissionStatus.Unavailable
    )
  }, [cameraStatus])

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

  return isCameraUnavailable ? (
    <Dialog contentUrl={cameraUnavailableDialog} />
  ) :
    <CameraStream
      {...{
        onRequestCameraComplete,
        requestCameraDialog,
        devicePermissionsStatus: [cameraStatus],
        onDecodeQr
      }}
    />
})

export default Camera
