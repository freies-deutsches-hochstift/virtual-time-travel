import { useSelector } from "react-redux";
import { PovsOverlayFeeds } from "@virtual-time-travel/geo";
import { useLabelGroup } from "../../../hooks/use-label";
import {
  selectClosestPov,
  selectCurrentGeoFence,
} from "../../../store/geo.slice";

export function ArFeeds() {
  const closestInViewPov = useSelector(selectClosestPov);
  const currentGeoFence = useSelector(selectCurrentGeoFence);
  const feeds = useLabelGroup("geo-feeds");

  return <PovsOverlayFeeds {...{ currentGeoFence, closestInViewPov, feeds }} />;
}

export default ArFeeds;
