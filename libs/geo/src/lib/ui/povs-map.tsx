/*
 * Map as pure img component
 * possibly in the future it will become an actual map
 */

import styled from "@emotion/styled";
import { Markdown, StyledMarkdown, StyledPage } from "@virtual-time-travel/ui";
import tw from "twin.macro";

import map from "/assets/layout/map-povs.jpg";
import povs from "/assets/layout/map-povs-overlay.png";

export interface PovsMapProps {
  contentUrl?: string;
}

export const PovsMap = ({ contentUrl }: PovsMapProps) => {
  return (
    <StyledMapCtn>
      <StyledMapLayer src={map} />
      <StyledMapOverlay />
      <StyledMapLayer src={povs} />
      {!!contentUrl && (
        <StyledMapContent>
          <Markdown contentUrl={contentUrl} />
        </StyledMapContent>
      )}
    </StyledMapCtn>
  );
};

const StyledMapCtn = styled.div(() => [tw`w-full h-full relative`]);

const StyledMapLayer = styled.img(() => [
  tw`absolute inset-0 w-full h-full object-cover`,
]);

const StyledMapOverlay = styled.div(() => [
  tw`absolute inset-0 w-full h-full mix-blend-color`,
  "background: var(--primary-gradient);",
]);
const StyledMapContent = styled(StyledPage)(() => [
  tw`absolute inset-0 w-full h-full`,
  `
    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      inset: 0;
      background: var(--primary-gradient);
      mask-image: var(--ui-map-mask);
    }

    ${StyledMarkdown} {
      position: relative;
      z-index: 2;
    }
  `,
]);

export default PovsMap;
