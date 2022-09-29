
import { useState } from 'react'

import { DeviceResponsePermission } from '@virtual-time-travel/util-device'
import useLocation from './use-location/use-location'

import styles from './geo.module.scss'
import { Position } from './utils'



export interface GeoProps {
  onRequestGeolocationComplete: (res: DeviceResponsePermission) => void
}

export function Geo(props: GeoProps) {
  const { onRequestGeolocationComplete } = props
  const [position, setPosition] = useState<Position>(null)
  const onChange = (res: Position) => {
    setPosition(res)
  }

  useLocation(onChange, onRequestGeolocationComplete)

  return (
    <div className={styles['container']}>
      <h1>AR GEO: {position?.coords?.latitude} </h1>
    </div>
  )
}

export default Geo
