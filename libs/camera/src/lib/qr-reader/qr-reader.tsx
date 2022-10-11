import { useCallback } from 'react'
import { useZxing } from 'react-zxing'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import { camera, CameraStreamProps, OnReadQr } from '../camera'
import Video from '../video/video'


export interface QrReaderProps {
  onReadQr: OnReadQr
}

export interface QrReaderWrapperProps extends CameraStreamProps {
  onReadQr: OnReadQr
}

export const QrReader = ({
  onReadQr,
  captureOptions,
  onRequestCameraComplete,
  requestCameraDialog,
  devicePermissionsStatus,
}: QrReaderWrapperProps) => {
  const requestStream = useCallback(async () => {
    const res = await camera.requestPermission(captureOptions)
    const { status, error } = res
    if (onRequestCameraComplete)
      onRequestCameraComplete({ status, error: JSON.stringify(error) })
  }, [captureOptions, onRequestCameraComplete])

  return (
    <WithDevicePermissionDialog
      {...{
        onConfirm: requestStream,
        dialogContentUrl: requestCameraDialog,
        devicePermissionsStatus,
      }}
    >
      <QrReaderVideo {...{ onReadQr }} />
    </WithDevicePermissionDialog>
  )
}

const QrReaderVideo = ({ onReadQr }: QrReaderProps) => {
  const { ref } = useZxing({
    onResult(result) {
      const text = result.getText()
      if (text) onReadQr(text)
    },
  })

  return <Video ref={ref} />
}

export default QrReader
