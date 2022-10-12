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
          <Markdown contentUrl={contentUrl} />
        </StyledCardDetailsContent>
        <Button highlight {...{ onClick: onClose, label: 'x' }} />
      </StyledCardDetailsInner>
    </StyledCardDetails>
  )
}


export default PovCardDetails

