import { ReactNode, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import useResizeObserver from 'use-resize-observer'

export interface ScrollableProps {
  children: ReactNode
}

export const Scrollable = ({ children }: ScrollableProps) => {
  const ctnRef = useRef<HTMLDivElement>(null)
  const { height = 0 } = useResizeObserver<HTMLDivElement>({
    ref: ctnRef,
  })

  const [isScrollable, setIsScrollable] = useState<boolean>(false)
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true)

  const handleScroll = () => {
    if (!ctnRef.current) return
    setIsScrollTop(ctnRef.current.scrollTop === 0)
  }

  useEffect(() => {
    if (!ctnRef?.current) return
    setIsScrollable(ctnRef.current.scrollHeight > height)
  }, [height])

  return (
    <StyledScrollableCtn ref={ctnRef} {...{ isScrollable, isScrollTop }} onScroll={handleScroll}>
      <StyledScrollable {...{ isScrollable }}>{children}</StyledScrollable>
    </StyledScrollableCtn>
  )
}

export interface StyledScrollableCtnProps {
  isScrollTop?: boolean
  isScrollable?: boolean
}

export const StyledScrollableCtn = styled.div(({ isScrollTop, isScrollable }: StyledScrollableCtnProps) => [
  tw`
      w-full h-full flex
      overflow-y-auto
    `,

  isScrollable &&
  `
    mask-image: var(--page-scrollmask);
  `,

  isScrollTop && `mask-image: var(--page-scrollmask--bottom);`
])

export interface StyledScrollableProps {
  isScrollable?: boolean
}

export const StyledScrollable = styled.div(
  ({ isScrollable }: StyledScrollableProps) => [

    tw`w-full flex flex-col`,
    isScrollable &&
    `
      padding-bottom: var(--bottom-mask-size);
    `,
  ]
)

export default Scrollable
