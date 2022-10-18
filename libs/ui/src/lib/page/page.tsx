import { ReactNode } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { StyledSubMenu } from '../menu'
import Scrollable from '../scrollable/scrollable'
import PageLogo from './page-logo'

export interface PageProps {
  children: ReactNode
  withLogo?: boolean
}

export const Page = ({ children, withLogo }: PageProps) => {

  return (
    <StyledPage>
      {withLogo && <PageLogo />}
      <Scrollable>
        {children}
      </Scrollable>
    </StyledPage>
  )
}


export const StyledPage = styled.div(() => [
  tw`
      w-full h-full
      pt-8 px-10
      max-w-app
      flex flex-col
    `,
  `
    * + ${StyledSubMenu} {
      padding-top: 2.5em;
    }
  `,
])

export const StyledPageGroup = styled.div(tw`
  w-full
  pt-16
`)

export const StyledPageDivider = styled.div(tw`
  w-full
  pt-8
`)

export default Page
