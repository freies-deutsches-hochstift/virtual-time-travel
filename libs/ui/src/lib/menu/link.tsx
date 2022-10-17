import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import tw from 'twin.macro'


export interface MenuLinkProps {
  label: string
  linkTo: string
  main?: boolean
}

export const MenuLink = ({ label, linkTo, main }: MenuLinkProps) => {
  return (
    <NavLink to={linkTo}>
      <StyledMenuLink {...{ main }}>{label}</StyledMenuLink>
    </NavLink>
  )
}

export interface StyledMenuLinkProps {
  main?: boolean
}

export const StyledMenuLink = styled.span((props: StyledMenuLinkProps) => [
  tw`
    py-2 w-full flex gap-2 items-center
  `,
  props.main && tw`font-headline text-xl tracking-wide`,
  !props.main && `
    text-decoration: underline;
    text-underline-offset: .4em;
  `,
])



