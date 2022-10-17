

import { ReactNode, useCallback } from 'react'
import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
  LocationOptions,
} from '@virtual-time-travel/geo-types'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'
import useLocation from './use-location/use-location'
import useOrientation from './use-orientation/use-orientation'


export interface GeoProps {
  requestGeoDialog: string
  onConfirmLabel: string
  onChangePosition: (pos: DeviceLocationEventRes) => void
  onRequestGeolocationComplete?: (res: DeviceResponsePermission) => void
  locationOptions?: LocationOptions
  onChangeOrientation: (event: DeviceOrientationEventRes) => void
  onRequestOrientationComplete?: (res: DeviceResponsePermission) => void
  devicePermissionsStatus: Array<PermissionStatus>
  children: ReactNode
}

export function Geo(props: GeoProps) {

  const { onChangePosition, onRequestGeolocationComplete, locationOptions, onChangeOrientation, onRequestOrientationComplete, requestGeoDialog, onConfirmLabel, devicePermissionsStatus, children } = props
  const { requestLocation } = useLocation(onChangePosition, onRequestGeolocationComplete, locationOptions)
  const { requestOrientation } = useOrientation(onChangeOrientation, onRequestOrientationComplete)

  const onConfirm = useCallback((e: unknown) => {
    requestLocation()
    requestOrientation()
  }, [
    requestLocation, requestOrientation
  ])

  return <WithDevicePermissionDialog {...{ onConfirm, onConfirmLabel, dialogContentUrl: requestGeoDialog, devicePermissionsStatus }}>
    {children}
  </WithDevicePermissionDialog>

}


export default Geo
