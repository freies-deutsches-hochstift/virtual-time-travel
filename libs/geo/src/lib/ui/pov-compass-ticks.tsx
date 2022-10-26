import { useMemo } from "react";
import styled from "@emotion/styled";
import { CurrentPov } from "@virtual-time-travel/geo-types";
import tw from "twin.macro";

export interface PovCompassProps {
  pov: CurrentPov;
}

export function PovCompassTicks({ pov }: PovCompassProps) {
  const { bearingViewportOrientation } = pov;

  const tickMarkerLeft = useMemo(() => {
    return (bearingViewportOrientation / 360) * 100;
  }, [bearingViewportOrientation]);

  /**
   * this module is displayed 2 times to guarantee a 360° experience
   * each sector represents 360° so that the marker can be placed
   * directly depending by its normalized bearingViewportOrientation
   */

  return (
    <StyledCompassTicks>
      {[...Array(2).keys()].map((sector: number) => (
        <StyledCompassTicksSector key={sector}>
          <StyledCompassTicksMarker {...{ left: tickMarkerLeft }} />
          {[...Array(17).keys()].map((tick: number) => (
            <StyledCompassTick key={tick} />
          ))}
        </StyledCompassTicksSector>
      ))}
    </StyledCompassTicks>
  );
}

export default PovCompassTicks;

const StyledCompassTicks = styled.div(() => [
  tw`
      absolute left-0 bottom-6 right-0
      h-ui-pov-compass-tickmarker
      flex
    `,
  `
      width: 200%;
      transform: translateX(-25%);
    `,
]);

const StyledCompassTicksSector = styled.div(() => [
  tw`
      w-1/2
      flex items-center justify-between relative
    `,
]);

const StyledCompassTick = styled.div(() => [
  tw`
      relative z-10 h-ui-pov-compass-tick
      after:content-['']
      after:absolute
      after:top-0
      after:h-full
      after:w-ui-pov-compass-tick
      after:left-ui-pov-compass-tick
      after:bg-ui-pov-compass
      after:rounded-sm
    `,
]);

type StyledCompassTicksMarkerProps = {
  left: number;
};

const StyledCompassTicksMarker = styled.div(
  ({ left }: StyledCompassTicksMarkerProps) => [
    tw`
      absolute z-20 w-2 h-ui-pov-compass-tickmarker
      after:content-['']
      after:absolute
      after:top-0
      after:h-full
      after:w-ui-pov-compass-tickmarker
      after:left-ui-pov-compass-tickmarker
      after:bg-ui-pov-compass-highlight-bg
      after:rounded-md
    `,
    `
      left: ${left}%;
    `,
  ],
);
