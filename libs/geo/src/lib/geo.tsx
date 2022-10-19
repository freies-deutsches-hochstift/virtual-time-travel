import { ReactNode, useCallback } from 'react'
import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
  LocationOptions,
} from '@virtual-time-travel/geo-types'
import {
  DialogProps,
  WithDevicePermissionDialog,
} from '@virtual-time-travel/ui'
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'
import useLocation from './use-location/use-location'
import useOrientation from './use-orientation/use-orientation'

export interface GeoProps {
  requestGeoDialog: DialogProps
  onChangePosition: (pos: DeviceLocationEventRes) => void
  onRequestGeolocationComplete?: (res: DeviceResponsePermission) => void
  locationOptions?: LocationOptions
  onChangeOrientation: (event: DeviceOrientationEventRes) => void
  onRequestOrientationComplete?: (res: DeviceResponsePermission) => void
  devicePermissionsStatus: Array<PermissionStatus>
  children: ReactNode
}

export function Geo(props: GeoProps) {
  const {
    onChangePosition,
    onRequestGeolocationComplete,
    locationOptions,
    onChangeOrientation,
    onRequestOrientationComplete,
    requestGeoDialog,
    devicePermissionsStatus,
    children,
  } = props
  const { requestLocation } = useLocation(
    onChangePosition,
    onRequestGeolocationComplete,
    locationOptions
  )
  const { requestOrientation } = useOrientation(
    onChangeOrientation,
    onRequestOrientationComplete
  )

  const onConfirm = useCallback(
    (e: unknown) => {
      requestLocation()
      requestOrientation()
    },
    [requestLocation, requestOrientation]
  )

  return (
    <WithDevicePermissionDialog
      {...{ onConfirm, devicePermissionsStatus, dialog: requestGeoDialog }}
    >
      {children}
    </WithDevicePermissionDialog>
  )
}

export default Geo
