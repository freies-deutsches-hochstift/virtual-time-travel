import { EnhancedPov } from '@virtual-time-travel/geo-types'
import { Markdown } from '@virtual-time-travel/markdown'
import Button from '../button/button'
import Icon, { Icons } from '../icon'
import Scrollable from '../scrollable/scrollable'
import {
  StyledCardDetails,
  StyledCardDetailsContent,
  StyledCardDetailsInner,
} from '../ui'

export interface PovCardDetailsProps {
  pov: EnhancedPov
  onClose: (e: unknown) => void
}

export function PovCardDetails({
  pov,
  onClose
}: PovCardDetailsProps) {
  const { contentUrl } = pov

  return (
    <StyledCardDetails>
      <StyledCardDetailsInner>
        <StyledCardDetailsContent>
          <Scrollable>
            <Markdown
              contentUrl={contentUrl}
              fallbackComponent={<MissingPovFallback {...{ pov }} />}
            />
          </Scrollable>
        </StyledCardDetailsContent>

        <Button highlight {...{ onClick: onClose, rounded: false }}>
          <Icon type={Icons.Close} />
        </Button>
      </StyledCardDetailsInner>
    </StyledCardDetails>
  )
}

interface MissingPovFallbackProps {
  pov: EnhancedPov
}

function MissingPovFallback({ pov }: MissingPovFallbackProps) {
  const { coverSrc, localizedTitle } = pov

  return (
    <>
      {!!coverSrc && <img src={coverSrc} alt={localizedTitle} />}
      <h3>{localizedTitle}</h3>
    </>
  )
}

export default PovCardDetails
