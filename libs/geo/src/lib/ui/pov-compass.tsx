import { useMemo } from "react";
import styled from "@emotion/styled";
import { OnSelectPov } from "@virtual-time-travel/app-router";
import { CurrentPov } from "@virtual-time-travel/geo-types";
import { LocalizedFieldGroup } from "@virtual-time-travel/localization";
import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";
import PovCompassTicks from "./pov-compass-ticks";

export interface PovCompassProps {
  pov: CurrentPov;
  onSelectPov?: OnSelectPov;
  feeds: LocalizedFieldGroup;
}

export function PovCompass({ pov, onSelectPov, feeds }: PovCompassProps) {
  const { id, inDirectView } = pov;

  const handleSelectPov = () => {
    if (onSelectPov) onSelectPov(id);
  };

  const feed = useMemo(() => {
    return feeds["view_pov"] || "Missing label::: labels.geo-feeds.view_pov";
  }, [feeds]);

  return (
    <StyledPovCompass>
      <StyledPovCompassInner>
        <AnimatePresence initial={false}>
          {inDirectView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-max"
              style={{ willChange: "opacity" }}
            >
              <StyledPovCta
                onClick={handleSelectPov}
                dangerouslySetInnerHTML={{ __html: feed }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <PovCompassTicks {...{ pov }} />
      </StyledPovCompassInner>
    </StyledPovCompass>
  );
}

export default PovCompass;

const StyledPovCompass = styled.div(() => [
  tw`
      absolute z-top inset-0
    `,
  `
      background: var(--ui-pov-compass-bg);
      background-size: cover;
    `,
]);
const StyledPovCompassInner = styled.div(() => [
  tw`
      absolute inset-2
    `,
]);

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
    width: 40vw;
    height: 40vw;
  `,
]);
