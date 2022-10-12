import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OnSelectPov, PovsOverlay } from '@virtual-time-travel/ui'
import { selectCurrentGeoFence, selectOrientation } from '../../store/geo.slice'


export function ArOverlay() {
  const navigate = useNavigate()
  const currentGeoFence = useSelector(selectCurrentGeoFence)
  const orientation = useSelector(selectOrientation)

  //TODO
  const onSelectPov = useCallback((povId) => {
    navigate(`/ar?povId=${povId}`)
  }, [navigate]) as OnSelectPov

  return (
    <PovsOverlay {...{ currentGeoFence, orientation, onSelectPov }} />
  )
}



