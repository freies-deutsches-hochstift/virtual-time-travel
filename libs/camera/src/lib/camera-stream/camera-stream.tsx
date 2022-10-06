import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import { DeviceResponsePermission, PermissionStatus } from '@virtual-time-travel/util-device'
import { camera, CameraResponsePermission, CaptureOptions } from '../camera'
import styles from './camera-stream.module.scss'

export interface CameraStreamProps {
  captureOptions?: CaptureOptions
  onRequestCameraComplete?: (res: DeviceResponsePermission) => void
  locale: string
  devicePermissionsStatus: Array<PermissionStatus>
}

export const CameraStream = memo((props: CameraStreamProps) => {
  const { captureOptions, onRequestCameraComplete, locale, devicePermissionsStatus } = props

  const videoElRef = useRef<HTMLVideoElement>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  const setResponse = (res: CameraResponsePermission) => {
    const { stream } = res

    if (!videoElRef.current || !stream) return
    setMediaStream(stream)
    videoElRef.current.srcObject = stream
  }

  const requestStream = useCallback(async () => {
    const res = await camera.requestPermission(captureOptions)
    const { status, error } = res
    setResponse(res)
    if (onRequestCameraComplete) onRequestCameraComplete({ status, error })
  }, [captureOptions, onRequestCameraComplete])


  useEffect(() => {
    if (!videoElRef.current) return
    videoElRef.current.srcObject = mediaStream

    return () => {
      if (mediaStream)
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
    }
  }, [mediaStream])

  return (
    <>
      <WithDevicePermissionDialog {...{ onConfirm: requestStream, dialogContentId: 'camera', locale, devicePermissionsStatus }} />
      <div className={styles['camera-stream']}>
        <video className={styles['camera-stream__video']} ref={videoElRef} autoPlay playsInline muted />
      </div>
    </>
  )
})
