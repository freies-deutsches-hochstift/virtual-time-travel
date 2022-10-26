import { useMemo } from "react";
import styled from "@emotion/styled";
import { OnSelectPov } from "@virtual-time-travel/app-router";
import { CurrentPov } from "@virtual-time-travel/geo-types";
import tw from "twin.macro";

export interface PovMarkerProps {
  pov: CurrentPov;
  compassScaleFactor: number;
  onSelectPov?: OnSelectPov;
}

export function PovMarker({
  pov,
  compassScaleFactor,
  onSelectPov,
}: PovMarkerProps) {
  const { id, bearingDistance, distance, inView } = pov;

  const scale = useMemo(() => {
    if (!distance) return 0;

    let scaleByDistance = 40 / distance;

    if (scaleByDistance > 1) scaleByDistance = 1;
    if (scaleByDistance < 0.1) scaleByDistance = 0.1;

    return scaleByDistance;
  }, [distance]);

  const left = useMemo(() => {
    if (!bearingDistance) return 0;
    return (bearingDistance * compassScaleFactor).toFixed(1);
  }, [bearingDistance, compassScaleFactor]);

  const showMeterDistance = useMemo(
    () => distance && distance < 180,
    [distance],
  );

  const handleSelectPov = () => {
    if (onSelectPov) onSelectPov(id);
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!bearingDistance) return <></>;

  return (
    <StyledPovMarker {...{ left, inView }}>
      <StyledPovWave {...{ scale, inView }} />
      <StyledPovInner onClick={handleSelectPov}>
        <StyledPovDistance>
          <svg viewBox="0 0 13 10" fill="none">
            <path
              d="M4.43182 2H7.97727L13 10H0L4.43182 2Z"
              fill="currentColor"
            />
            <path d="M6.20455 0L13 3H0L6.20455 0Z" fill="currentColor" />
          </svg>
          {showMeterDistance && `${distance}m`}
        </StyledPovDistance>
      </StyledPovInner>
    </StyledPovMarker>
  );
}

export default PovMarker;

type StyledPovMarkerProps = {
  left: string | number;
  inView: boolean;
};

const StyledPovMarker = styled.div(({ left, inView }: StyledPovMarkerProps) => [
  tw`
      absolute top-0 left-0
    `,
  `
    will-change: transform;
  `,
  left && `transform: translate(${left}px, 0);`,
  inView &&
    `
      display: none;
    `,
]);

const StyledPovInner = styled.div([
  tw`
    absolute top-ui-pov w-ui-pov h-ui-pov bg-ui-pov rounded-full
    flex items-center justify-center
  `,
  `
    transform: translate(-50%, -50%);
  `,
]);

const StyledPovDistance = styled.div([
  tw`
    absolute top-6 left-0 
    font-bold flex gap-2 items-center justify-center
  `,
  `
    & svg {
      height: .9em;
      width: auto;
    }
  `,
]);

type StyledPovWaveProps = {
  scale: number;
  inView: boolean;
};

const StyledPovWave = styled.div(({ scale, inView }: StyledPovWaveProps) => [
  tw`
    absolute top-ui-pov w-ui-pov-wave h-ui-pov-wave rounded-full
  `,

  !inView &&
    `
    transform: translate(-50%, -50%) scale(${scale});
    background: var(--ui-pov-waves);
    background-size: cover;
  `,
]);
