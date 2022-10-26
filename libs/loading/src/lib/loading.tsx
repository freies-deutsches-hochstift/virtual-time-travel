import { PuffLoader } from "react-spinners";
import styled from "@emotion/styled";
import tw from "twin.macro";

const StyledLoading = styled.div(tw`
  h-full w-full
  flex items-center justify-center
`);

export function Loading() {
  return (
    <StyledLoading>
      <PuffLoader color="var(--highlight)" size={140} />
    </StyledLoading>
  );
}

export default Loading;
