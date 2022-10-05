import { ReactNode } from 'react'
import styled from '@emotion/styled'
import tw from "twin.macro"
import Icon from '../icon/icon'


export interface MainNavProps {
  children: ReactNode
}

type MainNavButtonStyleProps = {
  active?: boolean
  disabled?: boolean
}


export interface MainNavButtonProps {
  type: string
  active?: boolean
  disabled?: boolean
}

const StyledMainNav = styled.nav(tw`
  w-full 
  bg-main-nav-bg
  text-main-nav-link
  flex items-center justify-center
`)

const StyledMainNavInner = styled.nav(tw`
  w-full 
  h-main-nav
  p-main-nav
  flex items-center justify-between gap-main-nav
  w-11/12
  max-w-app
`)

export function MainNav(props: MainNavProps) {
  const { children } = props

  return (
    <StyledMainNav>
      <StyledMainNavInner>
        {children}
      </StyledMainNavInner>
    </StyledMainNav>
  )
}



const StyledMainNavButton = styled.button((props: MainNavButtonStyleProps) => [
  tw`
    h-full
    text-main-nav-link
    flex items-center justify-center
    cursor-pointer
  `,
  `
    aspect-ratio: 1 / 1;
    & > svg {
      display: block;
      width: 75%;
      pointer-events: none;
      user-select: none;
    }
  `,
  props.active && tw`text-main-nav-link-active`,
  props.disabled && tw`opacity-50 pointer-events-none`
])

export function MainNavButton(props: MainNavButtonProps) {
  const { type, active, disabled, ...rest } = props

  return (
    <StyledMainNavButton active={active} disabled={disabled} {...rest}>
      <Icon type={type} />
    </StyledMainNavButton>
  )
}


export default MainNav
