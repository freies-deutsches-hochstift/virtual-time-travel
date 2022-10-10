

import { useMemo } from 'react'
import styled from '@emotion/styled'
import { CurrentGeoFence, CurrentPov, StateOrientation } from '@virtual-time-travel/geo-types'
import tw from "twin.macro"
import useResizeObserver from "use-resize-observer"
import { PovMarker } from './pov-marker'

export interface PovsOverlayProps {
  currentGeoFence: CurrentGeoFence | null
  orientation: StateOrientation
}

interface PovsProps {
  povs: Array<CurrentPov>
}

/**
 * we use as base circumference of 360px (360deg) so that the povs can be placed directly 
 * depending by their bearingDistance to the current location
 * then we increase it by a scale factor in order to properly being displayed on screen
 * this module is displayed 3 times to guarantee a 360° experience 
 */

const compassScaleFactor = 10
const circumference = 360 * compassScaleFactor
const sectors = 3
const wrapperWidth = circumference * sectors

const sectorsKeys = Array.from({ length: sectors }, (x, i) => `${i}_key`)


export function PovsOverlay({ currentGeoFence, orientation }: PovsOverlayProps) {

  const { povs } = currentGeoFence || {}
  const { compassHeading } = orientation || { compassHeading: 0 }
  const { ref: ctnRef, width: ctnWidth } = useResizeObserver()

  const centerStartPosition = useMemo(() => -circumference + (0.5 * (ctnWidth || 0)), [ctnWidth])

  const compassPosition = useMemo(() => centerStartPosition - ((compassHeading || 0) * compassScaleFactor), [centerStartPosition, compassHeading])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!povs) return <></>

  return (

    <StyledPovsOverlay ref={ctnRef}>
      <StyledPovsWrapper style={{ width: wrapperWidth, transform: `translateX(${compassPosition}px)` }}>
        {sectorsKeys.map(k => <Povs {...{ povs }} key={k} />)}
      </StyledPovsWrapper>
    </StyledPovsOverlay>
  )
}

export default PovsOverlay


function Povs({ povs }: PovsProps) {

  return <StyledPov style={{ width: circumference }}>
    {povs?.map(pov => <PovMarker key={pov.id} {...{ pov, compassScaleFactor }} />)}
  </StyledPov>
}



const StyledPovsOverlay = styled.div([
  tw`
    absolute left-0 bottom-0 z-top 
    overflow-hidden w-full
    flex
  `,
  `
    top: 15vh;
  `
])

const StyledPovsWrapper = styled.div([
  tw`
    absolute left-0 top-0 
    flex
  `,
])

const StyledPov = styled.div([
  tw`
    relative
  `,
])