/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from "react";
import styled from "@emotion/styled";
import { CurrentGeoFence, CurrentPov } from "@virtual-time-travel/geo-types";
import tw from "twin.macro";

export interface PovsOverlayFeedsProps {
  currentGeoFence: CurrentGeoFence | null;
  closestInViewPov?: CurrentPov;
}

// TODO this is still prototype level

export function PovsOverlayFeeds({
  currentGeoFence,
  closestInViewPov,
}: PovsOverlayFeedsProps) {
  const { povs } = currentGeoFence || {};

  const showLookAroundFeed = useMemo(() => {
    if (!povs) return false;
    return !povs.find((p) => (p.distance || 9999) < 100);
  }, [povs]);

  const getCloserFeed = useMemo(() => {
    if (!povs) return false;
    return !!povs.find((p) => (p.distance || 9999) < 100);
  }, [povs]);

  const findAngleFeed = useMemo(() => {
    if (!closestInViewPov) return false;
    return closestInViewPov.inView;
  }, [closestInViewPov]);

  const foundItFeed = useMemo(() => {
    if (!closestInViewPov) return false;
    return closestInViewPov.inDirectView;
  }, [closestInViewPov]);

  if (!povs) return <></>;

  if (showLookAroundFeed)
    return (
      <StyledPovsOverlayFeeds>
        Bewege dich auf einen der Kreise zu .
      </StyledPovsOverlayFeeds>
    );
  if (getCloserFeed && !findAngleFeed)
    return (
      <StyledPovsOverlayFeeds>
        Laufe soweit bis du dich vollkommen im Orangenen Kreis befindest.
      </StyledPovsOverlayFeeds>
    );
  if (findAngleFeed && !foundItFeed)
    return (
      <StyledPovsOverlayFeeds>
        Drehe dich um deine Achse bis der orangene Strich in der Mitte deines
        Bildschirms ist.
      </StyledPovsOverlayFeeds>
    );

  return <></>;
}

export default PovsOverlayFeeds;

const StyledPovsOverlayFeeds = styled.div([
  tw`
    absolute top-2 left-2 right-2 z-max
    bg-primary-b text-primary
    p-2
  `,
]);
