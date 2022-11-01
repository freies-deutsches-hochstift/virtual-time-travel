import { memo, useMemo } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

export interface CompassProps {
  compassBearing: number;
}

export function Compass({ compassBearing }: CompassProps) {
  const tickMarkerLeft = useMemo(() => {
    return (compassBearing / 360) * 100;
  }, [compassBearing]);

  return (
    <StyledCompassTicks>
      <StyledCompassTicksInner>
        <CompassSectors {...{ tickMarkerLeft }} />
      </StyledCompassTicksInner>
    </StyledCompassTicks>
  );
}

interface CompassSectorsProps {
  tickMarkerLeft: number;
}

const CompassSectors = memo(({ tickMarkerLeft }: CompassSectorsProps) => {
  /**
   * this module is displayed 2 times to guarantee a 360° experience
   * each sector represents 360° so that the marker can be placed
   * directly depending by its normalized bearingViewportOrientation
   */

  return (
    <>
      {[...Array(2).keys()].map((sector: number) => (
        <StyledCompassTicksSector key={sector}>
          <StyledCompassTicksMarker {...{ left: tickMarkerLeft }} />
          {[...Array(17).keys()].map((tick: number) => (
            <StyledCompassTick key={tick} />
          ))}
        </StyledCompassTicksSector>
      ))}
    </>
  );
});

export default Compass;

const StyledCompassTicks = styled.div(() => [
  tw`
      absolute left-2 bottom-6 right-2
      overflow-hidden
    `,
]);

const StyledCompassTicksInner = styled.div(() => [
  tw`
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
  `
      &::after {
        transform: translateX(-50%);
      }
    `,
]);

type StyledCompassTicksMarkerProps = {
  left: number;
};

const StyledCompassTicksMarker = styled.div(
  ({ left }: StyledCompassTicksMarkerProps) => [
    tw`
      absolute z-20 w-2 h-ui-pov-compass-tickmarker
      left-0
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

      &::after {
        transform: translateX(-50%);
      }
    `,
  ],
);
