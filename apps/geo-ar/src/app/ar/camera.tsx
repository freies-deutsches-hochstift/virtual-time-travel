import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { CameraStream, OnReadQr, QrReader } from '@virtual-time-travel/camera'
import { Dialog } from '@virtual-time-travel/ui'
import {
  DeviceFeatures,
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'
import { selectDialogsContentUrls } from '../store/config.slice'
import { deviceActions, selectCameraPermission } from '../store/device.slice'

interface ArCameraProps {
  useQr?: boolean
}

export const ArCamera = memo(({ useQr }: ArCameraProps) => {
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

  const onReadQr = useCallback((text) => {
    console.log(text)
  }, []) as OnReadQr

  return isCameraUnavailable ? (
    <Dialog contentUrl={cameraUnavailableDialog} />
  ) : useQr ? (
    <QrReader
      {...{
        onReadQr,
        onRequestCameraComplete,
        requestCameraDialog,
        devicePermissionsStatus: [cameraStatus],
      }}
    />
  ) : (
    <CameraStream
      {...{
        onRequestCameraComplete,
        requestCameraDialog,
        devicePermissionsStatus: [cameraStatus],
      }}
    />
  )
})

export default ArCamera
