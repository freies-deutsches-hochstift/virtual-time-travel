import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { MainNav, MainNavButton } from '@virtual-time-travel/ui'
import tw from 'twin.macro'
import PovDetails from '../pov-details/pov-details'

export interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <StyledLayout>
      <StyledMain>{children}</StyledMain>

      <PovDetails />

      <MainNav>
        <>
          <MainNavButton
            type={MainRoutes.Explore}
            link={getRoutePath(MainRoutes.Explore)}
          />
          <MainNavButton
            type={MainRoutes.Qr}
            link={getRoutePath(MainRoutes.Qr)}
          />
          <MainNavButton
            type={MainRoutes.List}
            link={getRoutePath(MainRoutes.List)}
          />
          <MainNavButton
            type={MainRoutes.Menu}
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
