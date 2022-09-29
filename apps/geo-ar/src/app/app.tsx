// import { useState } from 'react'
import { CameraStream } from '@virtual-time-travel/camera'
import { DeviceResponsePermission, Devices } from '@virtual-time-travel/util-device'
import { Position, useLocation, useOrientation } from '@virtual-time-travel/geo'


import { useDispatch } from 'react-redux'
import { deviceActions } from './state/device.slice'
import { geoActions } from './state/geo.slice'

import './app.scss'


export function App() {

  const dispatch = useDispatch()

  const onRequestCameraComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: Devices.Camera, ...res }))
  }

  const onRequestGeolocationComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: Devices.Geolocation, ...res }))
  }

  const onRequestOrientationComplete = (res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: Devices.Orientation, ...res }))
  }

  function onChangePosition(position: Position) {
    if (position?.coords) dispatch(geoActions.updateLocation({
      coords: [position.coords.latitude, position.coords.longitude],
      accuracy: position.coords.accuracy
    }))
  }

  function onChangeOrientation(event: DeviceOrientationEvent) {
    console.log(event)
  }

  useLocation(onChangePosition, onRequestGeolocationComplete)
  useOrientation(onChangeOrientation, onRequestOrientationComplete)

  return (
    <>
      {/* <Geo {...{ onRequestGeolocationComplete }} /> */}
      <CameraStream {...{ onRequestCameraComplete }} />
    </>
  )
}

export default App
