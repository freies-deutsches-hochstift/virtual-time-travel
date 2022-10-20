/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { uid } from 'react-uid'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import { ActionsGroup } from '../actions-group/actions-group'
import Button from '../button/button'
import Scrollable from '../scrollable/scrollable'


export interface MarkdownContentsProps {
  contents?: Array<string>
  asSlideshow?: boolean
  actions?: ReactNode
  labels?: { [key: string]: string }
}

export function MarkdownContents({
  contents = [],
  asSlideshow,
  actions,
  labels
}: MarkdownContentsProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const hasSlides = useMemo(() => contents.length > 1, [contents])
  const { next } = labels || {}

  const isLastSlide = useMemo(
    () => currentSlide === contents.length - 1,
    [currentSlide, contents]
  )

  const onNext = useCallback(() => {
    if (isLastSlide) return
    setCurrentSlide((s) => s + 1)
  }, [isLastSlide])

  return (
    <StyledMarkdownWrapper {...{ hasSlides }}>
      <StyledMarkdownContents {...{ hasSlides }}>
        {contents.map((content, i) => (
          <StyledMarkdown {...{ isSlide: hasSlides, current: i === currentSlide }}>
            <Scrollable>
              <div

                dangerouslySetInnerHTML={{ __html: content }}
                key={uid(i)}
              />
            </Scrollable>
          </StyledMarkdown>

        ))}
      </StyledMarkdownContents>
      {isLastSlide ? (
        actions
      ) : (
        <ActionsGroup>
          <Button onClick={onNext}>{next}</Button>
        </ActionsGroup>
      )}
    </StyledMarkdownWrapper>
  )
}

export default MarkdownContents

type StyledMarkdownWrapperProps = {
  hasSlides: boolean
}

export const StyledMarkdownWrapper = styled.div(
  ({ hasSlides }: StyledMarkdownWrapperProps) => [
    hasSlides && tw`absolute inset-0 overflow-hidden min-h-full flex flex-col`,
  ]
)

type StyledMarkdownContents = {
  hasSlides: boolean
}

export const StyledMarkdownContents = styled.div(
  ({ hasSlides }: StyledMarkdownContents) => [tw`w-full flex-1 relative`]
)

type StyledMarkdownProps = {
  isSlide: boolean
  current: boolean
}

export const StyledMarkdown = styled.div(
  ({ isSlide, current }: StyledMarkdownProps) => [
    isSlide &&
    tw`
      absolute inset-0 overflow-hidden 
      transition-opacity duration-500 opacity-0 pointer-events-none
    `,
    current &&
    tw`
      opacity-100 pointer-events-auto
    `,

    `
    h1 {
      font-size: 3rem;
      line-height: 1.25em;
      margin: 2rem 0;
    }
    
    h2 {
      font-size: 2rem;
      line-height: 1.25em;
      margin: 0 0 2rem 0;
    }
    
    h3 {
      font-size: 1rem;
      line-height: 1.6em;
      margin: 0 0 1rem 0;
    }

    h4, h5, h6, p {
      margin: 0 0 .5rem 0;
    }

    hr {
      margin: 2rem 0;
    }

    ul, ol {
      margin: 0 0 2rem 2rem;
    }

    ul {
      list-style-type: circle;
    }

    ul li:not(:last-child) {
      margin-bottom: 1em;
    }

    ol {
      list-style-type: decimal;
    }

    a {
      text-decoration: underline;
      text-underline-offset: .4em;
    }

    > * + p img,
    > * + img {
      padding-top: 1em;
    }

    .card {
      padding: 1.5rem;
    }

    .slide {
      position: relative;
      min-height: 100%;
    }

    .background,
    .background > p,
    .background > p > img {
      position: absolute;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    .background {
      inset: -1rem;
    }

    .background > p > img {
      object-fit: cover;
      object-position: top center;
      max-height: none;
    }
  `,
  ]
)
