import { useSelector } from "react-redux";
import { useOnSelectPov } from "@virtual-time-travel/app-router";
import { PovsOverlay } from "@virtual-time-travel/geo";
import {
  selectCompassHeading,
  selectCurrentLocationGeoFence,
} from "../../../store/geo.slice";

export function ArOverlay() {
  const currentGeoFence = useSelector(selectCurrentLocationGeoFence);
  const compassHeading = useSelector(selectCompassHeading);
  const onSelectPov = useOnSelectPov();

  return (
    <PovsOverlay
      {...{
        currentGeoFence,
        compassHeading: compassHeading || 0,
        onSelectPov,
      }}
    />
  );
}

export default ArOverlay;
