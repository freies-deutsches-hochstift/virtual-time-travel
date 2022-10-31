/* eslint-disable react/jsx-no-useless-fragment */
import { useSelector } from "react-redux";
import { useOnSelectPov } from "@virtual-time-travel/app-router";
import { PovCompass } from "@virtual-time-travel/geo";
import { useLabelGroup } from "../../../hooks/use-label";
import {
  selectClosestPov,
  selectCompassHeading,
} from "../../../store/geo.slice";

export function ArCompass() {
  const closestInViewPov = useSelector(selectClosestPov);
  const compassHeading = useSelector(selectCompassHeading);
  const feeds = useLabelGroup("geo-feeds");
  const onSelectPov = useOnSelectPov();

  return (
    <>
      {!!closestInViewPov && (
        <PovCompass
          {...{ pov: closestInViewPov, onSelectPov, compassHeading, feeds }}
        />
      )}
    </>
  );
}

export default ArCompass;
