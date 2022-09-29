import { DeviceResponsePermission } from '@virtual-time-travel/util-device'
import { useRef, useEffect, useCallback, useState, memo } from 'react'
import { camera, CameraResponsePermission, CaptureOptions } from '../camera'

import styles from './camera-stream.module.scss'

export interface CameraStreamProps {
  captureOptions?: CaptureOptions
  onRequestCameraComplete?: (res: DeviceResponsePermission) => void
}

export const CameraStream = memo((props: CameraStreamProps) => {
  const { captureOptions, onRequestCameraComplete } = props

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
    requestStream()
  }, [requestStream])

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
    <div className={styles['camera-stream']}>
      <video className={styles['camera-stream__video']} ref={videoElRef} autoPlay playsInline muted />
    </div>
  )
})
