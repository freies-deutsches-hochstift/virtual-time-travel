import { useSelector } from "react-redux";
import { useOnSelectPov } from "@virtual-time-travel/app-router";
import { PovsOverlay } from "@virtual-time-travel/geo";
import { useLabelGroup } from "../../../hooks/use-label";
import {
  selectClosestPov,
  selectCompassHeading,
  selectCurrentGeoFence,
} from "../../../store/geo.slice";
import ArCompass from "../compass/compass";
import ArFeeds from "../feeds/feeds";

export function ArOverlay() {
  const currentGeoFence = useSelector(selectCurrentGeoFence);
  const compassHeading = useSelector(selectCompassHeading);
  const closestInViewPov = useSelector(selectClosestPov);
  const feeds = useLabelGroup("geo-feeds");
  const onSelectPov = useOnSelectPov();

  return (
    <>
      <PovsOverlay
        {...{
          currentGeoFence,
          compassHeading: compassHeading || 0,
          onSelectPov,
          closestInViewPov,
          feeds,
        }}
      />
      <ArCompass />
      <ArFeeds />
    </>
  );
}

export default ArOverlay;
