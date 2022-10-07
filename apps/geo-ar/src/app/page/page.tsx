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
  p-16
  max-w-app
  overflow-y-auto
`)