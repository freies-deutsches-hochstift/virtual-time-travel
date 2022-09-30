

import { useCallback, useEffect, useState } from 'react'

import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device'



import { Dialog } from '@virtual-time-travel/ui'

import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
  LocationOptions,
} from './utils'

import styled from 'styled-components'
import useLocation from './use-location/use-location'
import useOrientation from './use-orientation/use-orientation'



// TODO actual styling
const StyledGeo = styled.div``

const StyledGeoFeedback = styled.div`
  position: absolute;
  inset: 0;
  z-index: 999;
  background: rgba(255,0,0, .5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`


export interface GeoProps {
  onChangePosition: (pos: DeviceLocationEventRes) => void,
  onRequestGeolocationComplete?: (res: DeviceResponsePermission) => void,
  locationOptions?: LocationOptions,
  onChangeOrientation: (event: DeviceOrientationEventRes) => void,
  onRequestOrientationComplete?: (res: DeviceResponsePermission) => void
}

export function Geo(props: GeoProps) {

  const { onChangePosition, onRequestGeolocationComplete, locationOptions, onChangeOrientation, onRequestOrientationComplete } = props

  // TODO proper dialog logic and feedbacks!!
  const [showDialog, setShowDialog] = useState<boolean>(true)
  const [authorized, setAuthorized] = useState<boolean>(false)

  const { requestLocation } = useLocation(onChangePosition, onRequestGeolocationComplete, locationOptions)
  const { requestOrientation } = useOrientation(onChangeOrientation, onRequestOrientationComplete)

  const onCancel = useCallback((e: unknown) => {
    setShowDialog(false)
  }, [])

  const onConfirm = useCallback((e: unknown) => {
    setAuthorized(true)
    setShowDialog(false)
    requestLocation()
    requestOrientation()
  }, [requestLocation, requestOrientation])


  useEffect(() => {
    return () => {
      if (onRequestOrientationComplete) onRequestOrientationComplete({ status: PermissionStatus.Unknown, error: null })
      if (onRequestGeolocationComplete) onRequestGeolocationComplete({ status: PermissionStatus.Unknown, error: null })
    }
  }, [onRequestOrientationComplete, onRequestGeolocationComplete])

  return (
    <StyledGeo>
      {showDialog && <Dialog {...{ onCancel, onConfirm, title: "Geo location permission", content: "Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus." }} />}
      {!showDialog && !authorized && <StyledGeoFeedback>Location Unauthorized!</StyledGeoFeedback>}
    </StyledGeo>
  )
}


export default Geo
