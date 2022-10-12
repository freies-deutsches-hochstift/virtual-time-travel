import { EnhancedPov } from '@virtual-time-travel/geo-types'
import { Markdown } from '@virtual-time-travel/markdown'
import Button from '../button/button'
import { StyledCardDetails, StyledCardDetailsContent, StyledCardDetailsInner } from '../ui'


export interface PovCardDetailsProps {
  pov: EnhancedPov
  onClose: (e: unknown) => void
}


export function PovCardDetails({ pov, onClose }: PovCardDetailsProps) {
  const { contentUrl } = pov


  return (
    <StyledCardDetails>
      <StyledCardDetailsInner>
        <StyledCardDetailsContent>
          <Markdown contentUrl={contentUrl} fallbackComponent={<MissingPovFallback {...{ pov }} />} />
        </StyledCardDetailsContent>
        <Button highlight {...{ onClick: onClose, label: 'x' }} />
      </StyledCardDetailsInner>
    </StyledCardDetails>
  )
}


interface MissingPovFallbackProps {
  pov: EnhancedPov
}

function MissingPovFallback({ pov }: MissingPovFallbackProps) {
  const { coverSrc, localizedTitle } = pov

  return <>
    {!!coverSrc && <img src={coverSrc} alt={localizedTitle} />}
    <h3>{localizedTitle}</h3>
  </>
}


export default PovCardDetails

