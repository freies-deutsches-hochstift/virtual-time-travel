
import { useMemo } from 'react'
import styled from '@emotion/styled'
import { CurrentPov } from '@virtual-time-travel/geo-types'
import tw from "twin.macro"


export interface PovMarkerProps {
  pov: CurrentPov
  compassScaleFactor: number
}




export function PovMarker({ pov, compassScaleFactor }: PovMarkerProps) {
  const { id, bearingDistance, distance, orientation = 0, bearingViewportOrientation } = pov

  const scale = useMemo(() => {

    let scaleByDistance = 1
    if (!distance) return scaleByDistance

    // TODO! these are just example values

    if (distance > 100) {
      scaleByDistance = .75
    }

    if (distance > 200) {
      scaleByDistance = .5
    }

    if (distance > 400) {
      scaleByDistance = .25
    }

    return scaleByDistance
  }, [distance])

  const left = useMemo(() => {
    if (!bearingDistance) return 0
    return bearingDistance * compassScaleFactor
  }, [bearingDistance, compassScaleFactor])



  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!bearingDistance) return <></>


  return (
    <StyledPovMarker  {...{ left, scale }}>
      <StyledPovWave {...{ bearingViewportOrientation }} />
      <StyledPovInner>
        <p>{distance}</p>
      </StyledPovInner>
    </StyledPovMarker>
  )
}


export default PovMarker

type StyledPovMarkerProps = {
  scale: number
  left: number
}

const StyledPovMarker = styled.div(({ scale, left }: StyledPovMarkerProps) =>
  [
    tw`
      absolute top-0
    `,
    scale && `transform: scale(${scale});`,
    left && `left: ${left}px;`,

  ]
)

const StyledPovInner = styled.div([
  tw`
    absolute top-ui-pov w-ui-pov h-ui-pov bg-ui-pov rounded-full
    flex items-center justify-center
  `,
  `
    transform: translate(-50%, -50%);
  `
])

type StyledPovWaveProps = {
  bearingViewportOrientation: number
}

const StyledPovWave = styled.div(({ bearingViewportOrientation }: StyledPovWaveProps) => [
  tw`
    absolute top-ui-pov  w-ui-pov-wave h-ui-pov-wave rounded-full
  `,
  `
    transform: translate(-50%, -50%) rotate(${bearingViewportOrientation}deg);
    transform-origin: center;
    background: var(--ui-pov-waves);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 85% 100%, 50% 50%, 15% 100%, 0% 100%);
  `
])
