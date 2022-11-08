import { EnhancedPov } from "@virtual-time-travel/geo-types";
import {
  Button,
  FadeAnimation,
  Icon,
  Icons,
  Markdown,
  StyledCardDetailsContent,
  StyledCardDetailsInner,
} from "@virtual-time-travel/ui";
import { AnimatePresence } from "framer-motion";
import tw from "twin.macro";

export interface PovCardDetailsProps {
  pov: EnhancedPov | null;
  onClose: (e: unknown) => void;
}

export function PovCardDetails({ pov, onClose }: PovCardDetailsProps) {
  return (
    <AnimatePresence>
      {!!pov && (
        <FadeAnimation
          key={pov?.id}
          css={tw`absolute inset-0 z-top flex items-center justify-center`}
        >
          <PovCardDetailsInner {...{ pov, onClose }} />
        </FadeAnimation>
      )}
    </AnimatePresence>
  );
}

interface PovCardDetailsInnerProps {
  pov: EnhancedPov;
  onClose: (e: unknown) => void;
  show?: boolean;
}

function PovCardDetailsInner({ pov, onClose }: PovCardDetailsInnerProps) {
  const { contentUrl } = pov;

  return (
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
  );
}

interface MissingPovFallbackProps {
  pov: EnhancedPov;
}

function MissingPovFallback({ pov }: MissingPovFallbackProps) {
  const { coverSrc, localizedTitle } = pov;

  return (
    <>
      {!!coverSrc && <img src={coverSrc} alt={localizedTitle} />}
      <h3>{localizedTitle}</h3>
    </>
  );
}

export default PovCardDetails;
