import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { MainNav, MainNavButton } from '@virtual-time-travel/ui'
import tw from "twin.macro"



export interface LayoutProps {
  children: ReactNode
}

const StyledLayout = styled.div(tw`
    w-full h-full
    flex flex-col
`)

const StyledMain = styled.main(tw`
    w-full h-full
    flex justify-center
`)

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <StyledLayout>
      <StyledMain>{children}</StyledMain>
      <MainNav>
        <>
          <MainNavButton type="ar" link="ar" />
          <MainNavButton type="qr" link="qr" />
          <MainNavButton type="list" link="list" />
          <MainNavButton type="menu" link="menu" />
        </>
      </MainNav>
    </StyledLayout>
  )
}

export default Layout
