
import { useMemo } from 'react'
import styled from '@emotion/styled'
import { OnSelectPov } from '@virtual-time-travel/app-router'
import { CurrentPov } from '@virtual-time-travel/geo-types'
import tw from "twin.macro"


export interface PovMarkerProps {
  pov: CurrentPov
  compassScaleFactor: number
  onSelectPov?: OnSelectPov
}


export function PovMarker({ pov, compassScaleFactor, onSelectPov }: PovMarkerProps) {
  const { id, bearingDistance, distance, inView, bearingViewportOrientation } = pov

  const scale = useMemo(() => {

    if (!distance) return 0

    let scaleByDistance = 40 / distance

    if (scaleByDistance > 1) scaleByDistance = 1
    if (scaleByDistance < .1) scaleByDistance = .1

    return scaleByDistance
  }, [distance])

  const left = useMemo(() => {
    if (!bearingDistance) return 0
    return bearingDistance * compassScaleFactor
  }, [bearingDistance, compassScaleFactor])

  const handleSelectPov = () => {
    if (onSelectPov) onSelectPov(id)
  }


  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!bearingDistance) return <></>


  return (
    <StyledPovMarker  {...{ left, inView }}>
      <StyledPovWave {...{ scale, inView, bearingViewportOrientation }} />
      <StyledPovInner onClick={handleSelectPov}>
        <p>{distance}</p>
      </StyledPovInner>
    </StyledPovMarker>
  )
}


export default PovMarker

type StyledPovMarkerProps = {
  left: number,
  inView: boolean
}

const StyledPovMarker = styled.div(({ left, inView }: StyledPovMarkerProps) =>
  [
    tw`
      absolute top-0
    `,
    left && `left: ${left}px;`,
    inView && `
      display: none;
    `,
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
  scale: number
  inView: boolean
  bearingViewportOrientation: number
}

const StyledPovWave = styled.div(({ scale, inView, bearingViewportOrientation }: StyledPovWaveProps) => [
  tw`
    absolute top-ui-pov w-ui-pov-wave h-ui-pov-wave rounded-full
  `,

  !inView && `
    transform: translate(-50%, -50%) scale(${scale}) rotate(${bearingViewportOrientation}deg);
    background: var(--ui-pov-waves);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 85% 100%, 50% 50%, 15% 100%, 0% 100%);
  `
])
