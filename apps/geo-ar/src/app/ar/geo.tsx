
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DeviceLocationEventRes, DeviceOrientationEventRes, Geo } from '@virtual-time-travel/geo'
import { DeviceFeatures, DeviceResponsePermission } from '@virtual-time-travel/util-device'
import { deviceActions, selectGeoPermissions } from '../../store/device.slice'
import { geoActions } from '../../store/geo.slice'
import { selectCurrentLocale } from '../../store/locales.slice'
import ArUi from '../ar-ui/ar-ui'

export function ArGeo() {

  const locale = useSelector(selectCurrentLocale)
  const devicePermissionsStatus = useSelector(selectGeoPermissions)

  const dispatch = useDispatch<Dispatch>()

  /**
   * always wrap props functions into useCallbacks to avoid useless re-renders
   */


  const onRequestGeolocationComplete = useCallback((res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Geolocation, ...res }))
  }, [dispatch])

  const onRequestOrientationComplete = useCallback((res: DeviceResponsePermission) => {
    dispatch(deviceActions.handlePermissionEvent({ permission: DeviceFeatures.Orientation, ...res }))
  }, [dispatch])

  const onChangePosition = useCallback((position: DeviceLocationEventRes) => {
    if (position?.coordinates) dispatch(geoActions.updateLocation(position))
  }, [dispatch])


  const onChangeOrientation = useCallback((event: DeviceOrientationEventRes) => {
    dispatch(geoActions.updateOrientation(event))
  }, [dispatch])


  return (
    <Geo {...{ onChangePosition, onRequestGeolocationComplete, onChangeOrientation, onRequestOrientationComplete, locale, devicePermissionsStatus }}>
      <ArUi />
    </Geo>
  )
}

export default ArGeo
