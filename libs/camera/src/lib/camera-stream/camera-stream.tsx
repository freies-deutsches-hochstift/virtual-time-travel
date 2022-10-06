import { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import { DeviceResponsePermission, PermissionStatus } from '@virtual-time-travel/util-device'
import tw from "twin.macro"
import { camera, CameraResponsePermission, CaptureOptions } from '../camera'

export interface CameraStreamProps {
  captureOptions?: CaptureOptions
  onRequestCameraComplete?: (res: DeviceResponsePermission) => void
  locale: string
  devicePermissionsStatus: Array<PermissionStatus>
}


const StyledCameraWrapper = styled.div(tw`
  w-full h-full relative overflow-hidden
`)


const StyledCameraVideo = styled.video(tw`
  block w-full h-full object-cover
`)


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

      {/* videoElRef needs to be always avail */}
      <StyledCameraWrapper>
        <StyledCameraVideo ref={videoElRef} autoPlay playsInline muted />
      </StyledCameraWrapper>
    </>
  )
})
