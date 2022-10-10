import { useSelector } from 'react-redux'
import { PovsOverlay } from '@virtual-time-travel/ui'
import { selectCurrentGeoFence, selectOrientation } from '../../store/geo.slice'


export function ArOverlay() {
  const currentGeoFence = useSelector(selectCurrentGeoFence)
  const orientation = useSelector(selectOrientation)

  return (
    <PovsOverlay {...{ currentGeoFence, orientation }} />
  )
}



