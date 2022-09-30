import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { CameraStream } from '@virtual-time-travel/camera'
import { DeviceResponsePermission, DeviceFeatures } from '@virtual-time-travel/util-device'
import { DeviceLocationEventRes, DeviceOrientationEventRes, Geo } from '@virtual-time-travel/geo'
import { useData } from '@virtual-time-travel/fetch-api'


import { deviceActions } from './state/device.slice'
import { geoActions } from './state/geo.slice'
import { fetchPovs } from './state/povs.slice'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { fetchFences } from './state/fences.slice'
import ArUi from './ar-ui/ar-ui'

import './app.scss'


export function App() {

  const dispatch = useDispatch<Dispatch>()


  /**
  * warning: TODO this is still as a prototype level,
  * it will be organized in dedicated components/routes later on
  *
  */

  const getPovs = useCallback(() => dispatch(fetchPovs() as unknown as AnyAction), [dispatch])
  useData(getPovs)

  const getFences = useCallback(() => dispatch(fetchFences() as unknown as AnyAction), [dispatch])
  useData(getFences)


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
    if (position?.coords) dispatch(geoActions.updateLocation(position))
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
