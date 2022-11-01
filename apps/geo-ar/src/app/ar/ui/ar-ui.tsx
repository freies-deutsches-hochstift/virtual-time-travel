import styled from "@emotion/styled";
import tw from "twin.macro";
import ArCompass from "./compass/compass";
import ArFeeds from "./feeds/feeds";
import ArFence from "./fence/fence";
// import ArDeviceOrientationHelper from "./device-orientation-helper/device-orientation-helper";
import { ArOverlay } from "./overlay/overlay";
import ArTutorial from "./tutorial/tutorial";

export function ArUi() {
  return (
    <StyledArUi>
      <ArOverlay />
      <ArFence />
      <ArCompass />
      <ArFeeds />
      <ArTutorial />
      {/* <ArDeviceOrientationHelper /> */}
    </StyledArUi>
  );
}

const StyledArUi = styled.div(tw`
  absolute inset-0 z-top
`);

export default ArUi;
