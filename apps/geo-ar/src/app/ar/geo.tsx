import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { Geo } from '@virtual-time-travel/geo'
import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
} from '@virtual-time-travel/geo-types'
import {
  DeviceFeatures,
  DeviceResponsePermission,
} from '@virtual-time-travel/util-device'
import ArUi from '../ar-ui/ar-ui'
import { useDialogByKey } from '../hooks/useDialogByKey'
import { deviceActions, selectGeoPermissions } from '../store/device.slice'
import { geoActions } from '../store/geo.slice'
import ArTutorial from './tutorial'

export function ArGeo() {
  const requestGeoDialog = useDialogByKey(
    DialogsContentsIds.RequestGeolocation
  )

  const devicePermissionsStatus = useSelector(selectGeoPermissions)

  const dispatch = useDispatch<Dispatch>()

  /**
   * always wrap props functions into useCallbacks to avoid useless re-renders
   */

  const onRequestGeolocationComplete = useCallback(
    (res: DeviceResponsePermission) => {
      dispatch(
        deviceActions.handlePermissionEvent({
          permission: DeviceFeatures.Geolocation,
          ...res,
        })
      )
    },
    [dispatch]
  )

  const onRequestOrientationComplete = useCallback(
    (res: DeviceResponsePermission) => {
      dispatch(
        deviceActions.handlePermissionEvent({
          permission: DeviceFeatures.Orientation,
          ...res,
        })
      )
    },
    [dispatch]
  )

  const onChangePosition = useCallback(
    (position: DeviceLocationEventRes) => {
      if (position?.coordinates) dispatch(geoActions.updateLocation(position))
    },
    [dispatch]
  )

  const onChangeOrientation = useCallback(
    (event: DeviceOrientationEventRes) => {
      dispatch(geoActions.updateOrientation(event))
    },
    [dispatch]
  )

  return (
    <>
      <ArTutorial />
      <Geo
        {...{
          onChangePosition,
          onRequestGeolocationComplete,
          onChangeOrientation,
          onRequestOrientationComplete,
          requestGeoDialog,
          devicePermissionsStatus,
        }}
      >
        <ArUi />
      </Geo>
    </>
  )
}

export default ArGeo
