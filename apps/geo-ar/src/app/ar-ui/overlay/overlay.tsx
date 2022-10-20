import { useSelector } from 'react-redux'
import { useOnSelectPov } from '@virtual-time-travel/app-router'
import { PovsOverlay } from '@virtual-time-travel/geo'
import { selectCurrentGeoFence, selectOrientation } from '../../store/geo.slice'


export function ArOverlay() {
  const currentGeoFence = useSelector(selectCurrentGeoFence)
  const orientation = useSelector(selectOrientation)

  const onSelectPov = useOnSelectPov()

  return (
    <PovsOverlay {...{ currentGeoFence, orientation, onSelectPov }} />
  )
}



