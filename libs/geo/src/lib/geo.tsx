

import { ReactNode, useCallback, useEffect } from 'react'
import { WithDevicePermissionDialog } from '@virtual-time-travel/ui'
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'
import useLocation from './use-location/use-location'
import useOrientation from './use-orientation/use-orientation'
import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
  LocationOptions,
} from './utils'



export interface GeoProps {
  locale: string
  onChangePosition: (pos: DeviceLocationEventRes) => void
  onRequestGeolocationComplete?: (res: DeviceResponsePermission) => void
  locationOptions?: LocationOptions
  onChangeOrientation: (event: DeviceOrientationEventRes) => void
  onRequestOrientationComplete?: (res: DeviceResponsePermission) => void
  devicePermissionsStatus: Array<PermissionStatus>
  children: ReactNode
}

export function Geo(props: GeoProps) {

  const { onChangePosition, onRequestGeolocationComplete, locationOptions, onChangeOrientation, onRequestOrientationComplete, locale, devicePermissionsStatus, children } = props
  const { requestLocation } = useLocation(onChangePosition, onRequestGeolocationComplete, locationOptions)
  const { requestOrientation } = useOrientation(onChangeOrientation, onRequestOrientationComplete)

  const onConfirm = useCallback((e: unknown) => {
    requestLocation()
    requestOrientation()
  }, [
    requestLocation, requestOrientation
  ])

  return <WithDevicePermissionDialog {...{ onConfirm, dialogContentId: 'geolocation', locale, devicePermissionsStatus }}>
    {children}
  </WithDevicePermissionDialog>

}


export default Geo
