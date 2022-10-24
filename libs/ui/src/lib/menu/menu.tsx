import styled from "@emotion/styled";
import tw from "twin.macro";

export const StyledMenuMain = styled.nav(tw`
  w-full h-full
  flex flex-col items-center justify-center gap-4
  text-center
`);

export const StyledSubMenu = styled.nav(tw`
  w-full
  flex flex-col gap-4
`);
