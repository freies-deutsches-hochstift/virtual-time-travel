import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Icons, MainNav, MainNavButton } from '@virtual-time-travel/ui'
import tw from 'twin.macro'
import PovDetails from '../povs/details'

export interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <StyledLayout>
      <StyledMain>
        <>
          {children}
          <PovDetails />
        </>
      </StyledMain>

      <MainNav>
        <>
          <MainNavButton
            type={Icons.Explore}
            link={getRoutePath(MainRoutes.Explore)}
          />
          <MainNavButton
            type={Icons.Qr}
            link={getRoutePath(MainRoutes.Qr)}
          />
          <MainNavButton
            type={Icons.List}
            link={getRoutePath(MainRoutes.List)}
          />
          <MainNavButton
            type={Icons.Menu}
            link={getRoutePath(MainRoutes.Menu)}
          />
        </>
      </MainNav>
    </StyledLayout>
  )
}

const StyledLayout = styled.div(tw`
    w-full h-full
    flex flex-col
`)

const StyledMain = styled.main(tw`
    w-full flex-1 overflow-hidden
    flex justify-center relative
`)

export default Layout
