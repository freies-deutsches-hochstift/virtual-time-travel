import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { GeoDebug } from '@virtual-time-travel/geo'
import { Dialog, Fence } from '@virtual-time-travel/ui'
import tw from "twin.macro"
import { selectCurrentGeoFence, selectOrientation, selectPosition } from '../../store/geo.slice'
import { selectCurrentLocale } from '../../store/locales.slice'
import { ArOverlay } from './overlay/overlay'


/* eslint-disable-next-line */
export interface ArUiProps { }


const StyledArUi = styled.div(tw`
  absolute inset-0 z-top
`)



export function ArUi(props: ArUiProps) {

  const currentGeoFence = useSelector(selectCurrentGeoFence)
  const locale = useSelector(selectCurrentLocale)

  if (!currentGeoFence?.fence) return <Dialog locale={locale} contentId='out-of-geofence' />

  return (
    <StyledArUi>

      {/* <GeoDebug {...{ position, orientation }} /> */}
      <Fence {...{ fenceTitle: currentGeoFence?.fence.title }} />
      <ArOverlay />
    </StyledArUi>
  )
}

export default ArUi