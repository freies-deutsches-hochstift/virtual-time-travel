/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from "react";
import styled from "@emotion/styled";
import { CurrentGeoFence, CurrentPov } from "@virtual-time-travel/geo-types";
import { LocalizedFieldGroup } from "@virtual-time-travel/localization";
import tw from "twin.macro";
import { AnimatePresence, motion } from "framer-motion";
import { uid } from "react-uid";

export interface PovsOverlayFeedsProps {
  currentGeoFence: CurrentGeoFence | null;
  feeds: LocalizedFieldGroup;
  closestInViewPov?: CurrentPov;
}

// TODO this is still prototype level

export function PovsOverlayFeeds({
  currentGeoFence,
  closestInViewPov,
  feeds,
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

  const feed = useMemo(() => {
    if (showLookAroundFeed)
      return (
        feeds["look_around"] || "Missing label::: labels.geo-feeds.look_around"
      );
    if (getCloserFeed && !findAngleFeed)
      return (
        feeds["get_closer"] || "Missing label::: labels.geo-feeds.get_closer"
      );
    if (findAngleFeed && !foundItFeed)
      return feeds["find_pov"] || "Missing label::: labels.geo-feeds.find_pov";
    return null;
  }, [feeds, showLookAroundFeed, getCloserFeed, findAngleFeed, foundItFeed]);

  if (!povs) return <></>;

  return (
    <AnimatePresence initial={false} mode="wait">
      {!!feed && (
        <motion.div
          key={uid(feed)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute top-2 left-2 right-2 z-max"
        >
          <StyledPovsOverlayFeeds dangerouslySetInnerHTML={{ __html: feed }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PovsOverlayFeeds;

const StyledPovsOverlayFeeds = styled.div([
  tw`
    bg-primary-b text-primary
    p-2
  `,
]);
