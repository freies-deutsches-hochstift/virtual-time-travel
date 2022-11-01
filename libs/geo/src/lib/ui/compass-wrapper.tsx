import styled from "@emotion/styled";
import tw from "twin.macro";

export const StyledCompassWrapper = styled.div(() => [
  tw`
      absolute z-top inset-0 
    `,
  `
      background: var(--ui-pov-compass-bg);
      background-size: cover;
    `,
]);
