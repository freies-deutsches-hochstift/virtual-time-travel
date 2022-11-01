import { memo, useMemo } from "react";
import styled from "@emotion/styled";
import { OnSelectPov } from "@virtual-time-travel/app-router";
import {
  CurrentGeoFenceByLocation,
  CurrentPovByLocation,
} from "@virtual-time-travel/geo-types";
import tw from "twin.macro";
import useResizeObserver from "use-resize-observer";
import { PovMarker } from "./pov-marker";

export interface PovsOverlayProps {
  currentGeoFence: CurrentGeoFenceByLocation | null;
  compassHeading: number;
  onSelectPov?: OnSelectPov;
}

interface PovsProps {
  povs: Array<CurrentPovByLocation>;
  onSelectPov?: OnSelectPov;
}

/**
 * we use as base circumference of 360px (360deg) so that the povs can be placed directly
 * depending by their bearingDistance to the current location
 * then we increase it by a scale factor in order to properly being displayed on screen
 * this module is displayed 3 times to guarantee a 360° experience
 */

const compassScaleFactor = 10;
const circumference = 360 * compassScaleFactor;
const sectors = 3;
const wrapperWidth = circumference * sectors;

const sectorsKeys = Array.from({ length: sectors }, (x, i) => `${i}_key`);

export function PovsOverlay({
  currentGeoFence,
  compassHeading,
  onSelectPov,
}: PovsOverlayProps) {
  const { povs } = currentGeoFence || {};
  const { ref: ctnRef, width: ctnWidth = 0 } = useResizeObserver();

  const centerStartPosition = useMemo(
    () => -circumference + 0.5 * ctnWidth,
    [ctnWidth],
  );
  const compassPosition = useMemo(
    () => centerStartPosition - compassHeading * compassScaleFactor,
    [centerStartPosition, compassHeading],
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!povs) return <></>;

  return (
    <StyledPovsOverlay ref={ctnRef}>
      <StyledPovsWrapper
        style={{
          width: wrapperWidth,
          transform: `translateX(${compassPosition}px)`,
          willChange: "transform",
        }}
      >
        <SectorsPovs {...{ povs, onSelectPov }} />
      </StyledPovsWrapper>
    </StyledPovsOverlay>
  );
}

export default PovsOverlay;

const SectorsPovs = memo(({ povs, onSelectPov }: PovsProps) => {
  return (
    <>
      {sectorsKeys.map((k) => (
        <Povs {...{ povs, onSelectPov }} key={k} />
      ))}
    </>
  );
});

function Povs({ povs, onSelectPov }: PovsProps) {
  return (
    <StyledPov style={{ width: circumference }}>
      {povs?.map((pov) => (
        <PovMarker key={pov.id} {...{ pov, compassScaleFactor, onSelectPov }} />
      ))}
    </StyledPov>
  );
}

const StyledPovsOverlay = styled.div([
  tw`
    absolute top-0 left-0 bottom-0 z-top 
    overflow-hidden w-full
    flex
  `,
]);

const StyledPovsWrapper = styled.div([
  tw`
    absolute left-0 top-0 
    flex
  `,
]);

const StyledPov = styled.div([
  tw`
    relative
  `,
]);
