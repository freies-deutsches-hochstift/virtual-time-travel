
import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { CameraStream } from '@virtual-time-travel/camera'
import { DeviceLocationEventRes, DeviceOrientationEventRes, Geo } from '@virtual-time-travel/geo'
import { DeviceFeatures, DeviceResponsePermission } from '@virtual-time-travel/util-device'
import ArUi from './ar-ui/ar-ui'
import { useStateData } from './hooks/useStateData'
import { deviceActions } from './state/device.slice'
import { geoActions } from './state/geo.slice'



export function App() {

  const dispatch = useDispatch<Dispatch>()

  useStateData()




  const onRequestCameraComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Camera, ...res }))
  }

  const onRequestGeolocationComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Geolocation, ...res }))
  }

  const onRequestOrientationComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Orientation, ...res }))
  }

  function onChangePosition(position: DeviceLocationEventRes) {
    if (position?.coordinates) dispatch(geoActions.updateLocation(position))
  }

  function onChangeOrientation(event: DeviceOrientationEventRes) {
    dispatch(geoActions.updateOrientation(event))
  }

  return (
    <>
      <ArUi />
      <Geo {...{ onChangePosition, onRequestGeolocationComplete, onChangeOrientation, onRequestOrientationComplete }} />
      <CameraStream {...{ onRequestCameraComplete }} />
    </>
  )
}

export default App
