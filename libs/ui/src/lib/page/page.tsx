import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import useResizeObserver from 'use-resize-observer'
import { StyledSubMenu } from '../menu'
import PageLogo from './page-logo'

export interface PageProps {
  children: ReactNode
  withLogo?: boolean
}

export const Page = ({ children, withLogo }: PageProps) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const { height = 0 } = useResizeObserver<HTMLDivElement>({
    round: Math.floor,
    ref: pageRef,
  })

  const [isScrollable, setIsScrollable] = useState<boolean>(false)

  useEffect(() => {
    if (!pageRef?.current) return
    setIsScrollable(pageRef.current.scrollHeight > height)
  }, [height])

  return (
    <StyledPage ref={pageRef} isScrollable={isScrollable}>
      {withLogo && <PageLogo />}
      <StyledScrollable {...{ isScrollable, withLogo }}>
        {children}
      </StyledScrollable>
    </StyledPage>
  )
}

export interface StyledPageProps {
  isScrollable?: boolean
}

export const StyledPage = styled.div(({ isScrollable }: StyledPageProps) => [
  tw`
      w-full h-full
      pt-8 px-10
      max-w-app
      overflow-y-auto
      flex flex-col
    `,

  isScrollable &&
  `
    mask-image: var(--page-scrollmask);

    * + ${StyledSubMenu} {
      padding-top: 2.5em;
    }
  `,
])

export interface StyledScrollableProps {
  isScrollable?: boolean
  withLogo?: boolean
}

export const StyledScrollable = styled.div(
  ({ isScrollable, withLogo }: StyledScrollableProps) => [
    tw`
    w-full
    flex-1
    pt-8
  `,
    withLogo && tw`pt-8`,
    isScrollable &&
    `
      padding-bottom: var(--bottom-mask-size);
    `,
  ]
)

export const StyledPageGroup = styled.div(tw`
  w-full
  pt-16
`)

export const StyledPageDivider = styled.div(tw`
  w-full
  pt-8
`)

export default Page
