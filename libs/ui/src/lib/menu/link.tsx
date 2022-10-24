import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import tw from "twin.macro";

export interface MenuLinkProps {
  label: string;
  linkTo: string;
  main?: boolean;
}

export const MenuLink = ({ label, linkTo, main }: MenuLinkProps) => {
  return (
    <NavLink to={linkTo}>
      <StyledMenuLink {...{ main }}>{label}</StyledMenuLink>
    </NavLink>
  );
};

export interface StyledMenuLinkProps {
  main?: boolean;
}

export const StyledMenuLink = styled.span(({ main }: StyledMenuLinkProps) => [
  tw`
    py-2 w-full flex gap-2 items-center
  `,
  main && tw`font-headline text-xl tracking-wide`,
  !main &&
    `
    text-decoration: underline;
    text-underline-offset: .4em;
  `,

  `svg, img {
    height: 1.1em;
    width: auto;
    margin: .1em 0 0 0;
  }`,
]);
