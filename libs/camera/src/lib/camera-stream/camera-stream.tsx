import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import { camera, CameraResponsePermission, CameraStreamProps } from '../camera'
import Video from '../video/video'



export const CameraStream = memo((props: CameraStreamProps) => {
  const {
    captureOptions,
    onRequestCameraComplete,
    requestCameraDialog,
    devicePermissionsStatus,
  } = props

  const videoElRef = useRef<HTMLVideoElement>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  const setResponse = (res: CameraResponsePermission) => {
    const { device } = res
    if (!videoElRef.current || !device?.stream) return
    setMediaStream(device.stream)
    videoElRef.current.srcObject = device.stream
  }

  const requestStream = useCallback(async () => {
    const res = await camera.requestPermission(captureOptions, true)
    const { status, error } = res
    setResponse(res)
    if (onRequestCameraComplete)
      onRequestCameraComplete({ status, error: JSON.stringify(error) })
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
      <WithDevicePermissionDialog
        {...{
          onConfirm: requestStream,
          dialogContentUrl: requestCameraDialog,
          devicePermissionsStatus,
        }}
      />
      {/* videoElRef needs to be always avail */}
      <Video ref={videoElRef} {...{ autoplay: true }} />
    </>
  )
})
