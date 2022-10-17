
/**
 * Camera stream component to be used standalone and or as qr-scanner
 * TODO: QrScanner has some deprecated types mismatch
 */


import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import QrScanner from 'qr-scanner'
import { camera, CameraResponsePermission, CameraStreamProps } from '../camera'
import Video from '../video/video'

export const CameraStream = memo((props: CameraStreamProps) => {
  const {
    captureOptions,
    onRequestCameraComplete,
    requestCameraDialog,
    onConfirmLabel,
    devicePermissionsStatus,
    onDecodeQr
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


  const onDecodeError = useCallback((error) => {
    console.debug('QR-SCANNER', error)
  }, []) as (error: Error | string) => void


  useEffect(() => {
    if (!videoElRef.current || !mediaStream) return
    videoElRef.current.srcObject = mediaStream

    return () => {
      if (mediaStream)
        mediaStream.getTracks().forEach((track) => {
          track.stop()
        })
    }
  }, [mediaStream])


  useEffect(() => {
    if (!videoElRef.current || !mediaStream) return
    let qrScanner: QrScanner | null = null
    const video = videoElRef.current as HTMLVideoElement

    if (typeof onDecodeQr !== 'function') return

    qrScanner = new QrScanner(video, onDecodeQr, onDecodeError)
    qrScanner.start()

    return () => {
      if (qrScanner)
        qrScanner.destroy()
    }

  }, [mediaStream, onDecodeQr, onDecodeError])



  return (
    <>
      <WithDevicePermissionDialog
        {...{
          onConfirm: requestStream,
          onConfirmLabel,
          dialogContentUrl: requestCameraDialog,
          devicePermissionsStatus,
        }}
      />
      {/* videoElRef needs to be always avail */}
      <Video ref={videoElRef} {...{ autoplay: true }} />
    </>
  )
})
