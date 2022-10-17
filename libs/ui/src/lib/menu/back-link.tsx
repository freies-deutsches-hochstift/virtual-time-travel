
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro'
import { MenuLinkProps, StyledMenuLink } from './link'

import Arrow from '/assets/medias/arrow.svg'


export const MenuBackLink = ({ label, linkTo }: MenuLinkProps) => {
  return (
    <NavLink to={linkTo}>
      <StyledMenuLink {...{ main: true }} css={tw`pb-8`}><Arrow />{label}</StyledMenuLink>
    </NavLink>
  )
}