
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DeviceLocationEventRes, DeviceOrientationEventRes, Geo } from '@virtual-time-travel/geo'
import { DeviceFeatures, DeviceResponsePermission } from '@virtual-time-travel/util-device'
import ArUi from '../ar-ui/ar-ui'
import { deviceActions } from '../state/device.slice'
import { geoActions } from '../state/geo.slice'
import { selectCurrentLocale } from '../state/locales.slice'

export function ArGeo() {

  const locale = useSelector(selectCurrentLocale)

  const dispatch = useDispatch<Dispatch>()


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
      <Geo {...{ onChangePosition, onRequestGeolocationComplete, onChangeOrientation, onRequestOrientationComplete, locale }} />
    </>
  )
}

export default ArGeo
