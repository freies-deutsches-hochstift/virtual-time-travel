import { useSelector } from "react-redux";
import { useOnSelectPov } from "@virtual-time-travel/app-router";
import { PovsOverlay } from "@virtual-time-travel/geo";
import { useLabelGroup } from "../../../hooks/use-label";
import {
  selectClosestPov,
  selectCurrentGeoFence,
  selectOrientation,
} from "../../../store/geo.slice";

export function ArOverlay() {
  const currentGeoFence = useSelector(selectCurrentGeoFence);
  const orientation = useSelector(selectOrientation);
  const closestInViewPov = useSelector(selectClosestPov);
  const feeds = useLabelGroup("geo-feeds");
  const onSelectPov = useOnSelectPov();

  return (
    <PovsOverlay
      {...{
        currentGeoFence,
        orientation,
        onSelectPov,
        closestInViewPov,
        feeds,
      }}
    />
  );
}

export default ArOverlay;
