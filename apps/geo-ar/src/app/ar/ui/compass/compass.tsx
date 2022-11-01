/* eslint-disable react/jsx-no-useless-fragment */
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useOnSelectPov } from "@virtual-time-travel/app-router";
import {
  Compass,
  PovInDirectView,
  StyledCompassWrapper,
} from "@virtual-time-travel/geo";
import { useLabelGroup } from "../../../hooks/use-label";
import {
  selectClosestPovInViewCompassBearing,
  selectHasClosestPov,
  selectInDirectViewPovId,
} from "../../../store/geo.slice";

export function ArCompass() {
  const hasClosestInViewPov = useSelector(selectHasClosestPov);

  return (
    <>
      <PovInDirectViewCta />
      {!!hasClosestInViewPov && (
        <StyledCompassWrapper>
          <ArCompassInner />
        </StyledCompassWrapper>
      )}
    </>
  );
}

const PovInDirectViewCta = memo(() => {
  const inDirectViewPovId = useSelector(selectInDirectViewPovId);
  const onSelectPov = useOnSelectPov();
  const feeds = useLabelGroup("geo-feeds");
  const label = useMemo(() => {
    return feeds["view_pov"] || "Missing label::: labels.geo-feeds.view_pov";
  }, [feeds]);

  const onSelect = useCallback(() => {
    if (inDirectViewPovId) onSelectPov(inDirectViewPovId);
  }, [inDirectViewPovId, onSelectPov]);

  return (
    <PovInDirectView
      {...{ onSelect, label, show: typeof inDirectViewPovId !== "undefined" }}
    />
  );
});

function ArCompassInner() {
  const compassBearing = useSelector(selectClosestPovInViewCompassBearing);
  return <Compass {...{ compassBearing }} />;
}

export default ArCompass;
