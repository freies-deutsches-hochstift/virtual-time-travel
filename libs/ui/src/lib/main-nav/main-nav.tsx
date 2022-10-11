import { ReactNode, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import tw from 'twin.macro'
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
  link: string
  disabled?: boolean
}

const StyledMainNav = styled.nav(tw`
  w-full h-ui-nav flex-shrink-0
  bg-ui-nav-bg
  text-ui-nav-link
  flex items-center justify-center
`)

const StyledMainNavInner = styled.nav([
  tw`
    w-full 
    h-full
    p-ui-nav
    flex items-center justify-between gap-ui-nav
    w-11/12
    max-w-app
  `,
  `
    & > a {
      display: block;
      height: 100%;
      aspect-ratio: 1 / 1;
    }
  `,
])

export function MainNav(props: MainNavProps) {
  const { children } = props

  return (
    <StyledMainNav>
      <StyledMainNavInner>{children}</StyledMainNavInner>
    </StyledMainNav>
  )
}

const StyledMainNavLink = styled.span((props: MainNavButtonStyleProps) => [
  tw`
    h-full w-full
    text-ui-nav-link 
    flex items-center justify-center
    cursor-pointer
  `,
  `
    & > svg {
      display: block;
      width: 75%;
      pointer-events: none;
      user-select: none;
    }
  `,
  props.active && tw`text-ui-nav-link-active`,
  props.disabled && tw`opacity-50 pointer-events-none`,
])

export function MainNavButton(props: MainNavButtonProps) {
  const { type, link, disabled, ...rest } = props
  const location = useLocation()

  const isActive = useCallback(() => {
    const { pathname, search } = location
    return [pathname, search].join('') === link
  }, [location, link])

  return (
    <NavLink to={link}>
      <StyledMainNavLink active={isActive()} disabled={disabled} {...rest}>
        <Icon type={type} />
      </StyledMainNavLink>
    </NavLink>
  )
}

export default MainNav
