import { ReactNode } from 'react'
import styled from '@emotion/styled'
import tw from "twin.macro"

export interface PageProps {
  children: ReactNode
}


export function Page(props: PageProps) {
  const { children } = props

  return (
    <StyledPage>
      {children}
    </StyledPage>
  )
}

export default Page


const StyledPage = styled.div(tw`
  w-full h-full
  py-16 px-12
  max-w-app
  overflow-y-auto
`)


export const StyledPageGroup = styled.div(tw`
  w-full
  pt-16
`)