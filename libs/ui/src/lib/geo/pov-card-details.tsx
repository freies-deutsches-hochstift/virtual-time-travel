import { ReactNode } from 'react'
import { EnhancedPov } from '@virtual-time-travel/geo-types'
import { Markdown } from '@virtual-time-travel/markdown'
import Button from '../button/button'
import {
  StyledCardDetails,
  StyledCardDetailsContent,
  StyledCardDetailsInner,
} from '../ui'

export interface PovCardDetailsProps {
  pov: EnhancedPov
  onClose: (e: unknown) => void
  closeIcon?: ReactNode
}

export function PovCardDetails({
  pov,
  onClose,
  closeIcon,
}: PovCardDetailsProps) {
  const { contentUrl } = pov

  return (
    <StyledCardDetails>
      <StyledCardDetailsInner>
        <StyledCardDetailsContent>
          <Markdown
            contentUrl={contentUrl}
            fallbackComponent={<MissingPovFallback {...{ pov }} />}
          />
        </StyledCardDetailsContent>

        <Button highlight {...{ onClick: onClose, rounded: false }}>
          {closeIcon ? closeIcon : <svg viewBox="0 0 26 26" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.747183 0.743521C0.0702746 1.42043 0.0702749 2.51792 0.747184 3.19483L10.5525 13.0001L0.747239 22.8053C0.07033 23.4822 0.0703301 24.5797 0.747239 25.2566C1.42415 25.9335 2.52163 25.9335 3.19854 25.2566L13.0038 15.4514L22.8089 25.2566C23.4858 25.9335 24.5833 25.9335 25.2602 25.2566C25.9371 24.5796 25.9371 23.4822 25.2602 22.8053L15.4551 13.0001L25.2603 3.1949C25.9372 2.51799 25.9372 1.4205 25.2603 0.743596C24.5834 0.0666874 23.4859 0.0666869 22.809 0.743596L13.0038 10.5488L3.19849 0.743521C2.52158 0.0666126 1.42409 0.0666127 0.747183 0.743521Z" fill="currentColor" />
          </svg>}
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
