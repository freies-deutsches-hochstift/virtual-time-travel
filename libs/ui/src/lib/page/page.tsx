import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import Scrollable from "../scrollable/scrollable";

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <StyledPage>
      <Scrollable>{children}</Scrollable>
    </StyledPage>
  );
};

export const StyledPage = styled.div(() => [
  tw`
      w-full h-full
      pt-8 px-10
      max-w-app
      flex flex-col
    `,
]);

export const StyledPageGroup = styled.div(tw`
  w-full
  pt-16
`);

export const StyledPageDivider = styled.div(tw`
  w-full
  pt-8
`);

export default Page;
