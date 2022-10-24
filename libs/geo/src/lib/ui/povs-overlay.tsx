import { useMemo } from "react";
import styled from "@emotion/styled";
import { OnSelectPov } from "@virtual-time-travel/app-router";
import {
  CurrentGeoFence,
  CurrentPov,
  StateOrientation,
} from "@virtual-time-travel/geo-types";
import tw from "twin.macro";
import useResizeObserver from "use-resize-observer";
import PovCompass from "./pov-compass";
import { PovMarker } from "./pov-marker";
import PovsOverlayFeeds from "./povs-overlay-feeds";

export interface PovsOverlayProps {
  currentGeoFence: CurrentGeoFence | null;
  orientation: StateOrientation;
  onSelectPov?: OnSelectPov;
}

interface PovsProps {
  povs: Array<CurrentPov>;
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
  orientation,
  onSelectPov,
}: PovsOverlayProps) {
  const { povs } = currentGeoFence || {};
  const { compassHeading = 0 } = orientation || {};
  const { ref: ctnRef, width: ctnWidth = 0 } = useResizeObserver();

  const centerStartPosition = useMemo(
    () => -circumference + 0.5 * ctnWidth,
    [ctnWidth],
  );
  const compassPosition = useMemo(
    () => centerStartPosition - compassHeading * compassScaleFactor,
    [centerStartPosition, compassHeading],
  );

  const closestInViewPov = useMemo(
    () =>
      povs
        ?.filter((p) => p.inView)
        .sort((a, b) => (a?.distance || 99999) - (b?.distance || 99999))
        .pop(),
    [povs],
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!povs) return <></>;

  return (
    <StyledPovsOverlay ref={ctnRef}>
      <PovsOverlayFeeds {...{ currentGeoFence, closestInViewPov }} />
      {!!closestInViewPov && (
        <PovCompass
          {...{ pov: closestInViewPov, onSelectPov, compassHeading }}
        />
      )}
      <StyledPovsWrapper
        style={{
          width: wrapperWidth,
          transform: `translateX(${compassPosition}px)`,
        }}
      >
        {sectorsKeys.map((k) => (
          <Povs {...{ povs, onSelectPov }} key={k} />
        ))}
      </StyledPovsWrapper>
    </StyledPovsOverlay>
  );
}

export default PovsOverlay;

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
