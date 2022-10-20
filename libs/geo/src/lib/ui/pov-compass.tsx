import { useMemo } from 'react'
import styled from '@emotion/styled'
import { OnSelectPov } from '@virtual-time-travel/app-router'
import { CurrentPov } from '@virtual-time-travel/geo-types'
import tw from 'twin.macro'
import PovCompassTicks from './pov-compass-ticks'

export interface PovCompassProps {
  pov: CurrentPov
  onSelectPov?: OnSelectPov
}

export function PovCompass({ pov, onSelectPov }: PovCompassProps) {
  const { id, inDirectView } = pov

  const handleSelectPov = () => {
    if (onSelectPov) onSelectPov(id)
  }

  return (
    <StyledPovCompass>
      <StyledPovCompassInner>
        {inDirectView && (
          <StyledPovCta onClick={handleSelectPov}>
            Blickwinkel ansehen
          </StyledPovCta>
        )}
        <PovCompassTicks {...{ pov }} />
      </StyledPovCompassInner>
    </StyledPovCompass>
  )
}

export default PovCompass

const StyledPovCompass = styled.div(() => [
  tw`
      absolute z-top inset-0
    `,
  `
      background: var(--ui-pov-compass-bg);
      background-size: cover;
    `,
])
const StyledPovCompassInner = styled.div(() => [
  tw`
      absolute inset-2
    `,
])


const StyledPovCta = styled.div(() => [
  tw`
    bg-ui-pov rounded-full
    absolute
    top-1/3 left-1/3
    drop-shadow-sm
    flex items-center justify-center
    text-center
  `,
  `
    width: 35vw;
    height: 35vw;
  `,
])
