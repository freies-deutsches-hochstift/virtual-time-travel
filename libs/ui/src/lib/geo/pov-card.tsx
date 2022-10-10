import { EnhancedPov } from '@virtual-time-travel/geo-types'
import { StyledCard, StyledCardContent, StyledCardCover } from '../ui'

export interface PovCardProps {
  pov: EnhancedPov
}

export function PovCard({ pov }: PovCardProps) {
  const { coverSrc, localizedTitle } = pov

  return (
    <StyledCard>
      <StyledCardCover>
        {!!coverSrc && <img src={coverSrc} alt={localizedTitle} />}
      </StyledCardCover>

      <StyledCardContent>
        <h3>{localizedTitle}</h3>
      </StyledCardContent>
    </StyledCard>
  )
}
