
import { useMemo } from 'react'
import styled from '@emotion/styled'
import { OnSelectPov } from '@virtual-time-travel/app-router'
import { CurrentPov } from '@virtual-time-travel/geo-types'
import tw from "twin.macro"



export interface PovCompassProps {
  pov: CurrentPov
  onSelectPov?: OnSelectPov
}


export function PovCompass({ pov, onSelectPov }: PovCompassProps) {
  const { distance, id, bearingViewportOrientation, inDirectView } = pov

  const tickMarkerLeft = useMemo(() => {
    if (bearingViewportOrientation === 0) return 50
    const perc = Math.abs(bearingViewportOrientation / 180) * 100
    const percOfPerc = (perc / 2)
    if (bearingViewportOrientation > 0) return 50 + percOfPerc
    return 50 - percOfPerc
  }, [bearingViewportOrientation])

  const handleSelectPov = () => {
    if (onSelectPov) onSelectPov(id)
  }

  return (
    <StyledPovCompass>
      id: {id} - {distance}m / {bearingViewportOrientation} / {tickMarkerLeft}

      {inDirectView && <StyledPovCta onClick={handleSelectPov}>Blickwinkel ansehen </StyledPovCta>}
      <StyledCompassTicks>
        <StyledCompassTicksMarker {...{ left: tickMarkerLeft }} />
        {[...Array(9).keys()].map((tick: number) => <StyledCompassTick key={tick} />)}
      </StyledCompassTicks>
    </StyledPovCompass>
  )
}


export default PovCompass

const StyledPovCompass = styled.div(() =>
  [
    tw`
      absolute top-0 z-max inset-2
    `,
    `background: var(--ui-pov-waves);`
  ]
)


const StyledCompassTicks = styled.div(() =>
  [
    tw`
      absolute left-0 bottom-4 right-0
      h-6
      flex justify-between
    `,
  ]
)

const StyledCompassTick = styled.div(() =>
  [
    tw`
      bg-primary w-1
    `,
  ]
)


type StyledCompassTicksMarkerProps = {
  left: number
}


const StyledCompassTicksMarker = styled.div(({ left }: StyledCompassTicksMarkerProps) =>
  [
    tw`
      absolute w-2 h-12 bottom-4
    `,
    `
      background: red;
      left: ${left}%;
    `
  ]
)

const StyledPovCta = styled.div(() =>
  [
    tw`
    bg-ui-pov rounded-full
    absolute
    top-1/3 left-1/3
  `,
    `
      width: 30vw;
      height: 30vw;
  `
  ]
)

