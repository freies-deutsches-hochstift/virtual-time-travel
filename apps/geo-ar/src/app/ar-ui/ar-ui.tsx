import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { Fence } from '@virtual-time-travel/geo'
import { Dialog } from '@virtual-time-travel/ui'
import tw from "twin.macro"
import { useDialogByKey } from '../hooks/useDialogByKey'
import { selectCurrentGeoFence } from '../store/geo.slice'
import { ArOverlay } from './overlay/overlay'

export function ArUi() {
  const currentGeoFence = useSelector(selectCurrentGeoFence)

  const outOfGeofenceDialog = useDialogByKey(DialogsContentsIds.OutOfGeoFence)

  if (!currentGeoFence?.fence) return <Dialog {...outOfGeofenceDialog} />

  return (
    <StyledArUi>
      <Fence {...{ fenceTitle: currentGeoFence?.fence.title }} />
      <ArOverlay />
    </StyledArUi>
  )
}

const StyledArUi = styled.div(tw`
  absolute inset-0 z-top
`)

export default ArUi