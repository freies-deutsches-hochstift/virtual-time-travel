import { DeviceResponsePermission } from '@virtual-time-travel/util-device'
import { useState } from 'react'


import { CaptureOptions, CameraStream } from "./"

interface CameraExampleProps {
  captureOptions?: CaptureOptions
}

export function CameraExample(props: CameraExampleProps) {
  const [enableCamera, setEnableCamera] = useState<boolean>(true)

  const toggleCamera = () => {
    setEnableCamera((e) => !e)
  }

  const onRequestCameraComplete = (res: DeviceResponsePermission) => {
    console.log('onRequestCameraComplete', res)
  }

  return <>
    <div>
      <h1>Camera Demo</h1>
      <button onClick={toggleCamera}>
        {enableCamera ? 'Disable' : 'Enable'}
      </button>
    </div>

    {enableCamera && <CameraStream {...{ onRequestCameraComplete }} />}



    <div>
      Note : Most devices want you to request hardware access via a user
      event, like onClick. If permission has been granted before you can skip
      this, but there is also no way to check easily. You could save the state
      to localStore, but it could have changed.
    </div>

  </>
}
