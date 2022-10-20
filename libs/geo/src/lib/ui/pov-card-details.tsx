import { EnhancedPov } from '@virtual-time-travel/geo-types'
import {
  Button,
  Icon, Icons,
  Markdown,
  StyledCardDetails,
  StyledCardDetailsContent,
  StyledCardDetailsInner,
} from '@virtual-time-travel/ui'

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
          <Markdown
            asSlideshow
            contentUrl={contentUrl}
            fallbackComponent={<MissingPovFallback {...{ pov }} />}
          />
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
