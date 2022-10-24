import styled from "@emotion/styled";
import tw from "twin.macro";
import ArFence from "./fence/fence";
import { ArOverlay } from "./overlay/overlay";
import ArTutorial from "./tutorial/tutorial";

export function ArUi() {
  return (
    <StyledArUi>
      <ArFence />
      <ArOverlay />
      <ArTutorial />
    </StyledArUi>
  );
}

const StyledArUi = styled.div(tw`
  absolute inset-0 z-top
`);

export default ArUi;
