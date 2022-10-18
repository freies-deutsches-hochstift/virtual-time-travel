/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback } from 'react'
import Async from 'react-async'
import styled from '@emotion/styled'
import { Loading } from '@virtual-time-travel/loading'
import { getParsedFileContentById } from './parse-content'

export interface PageProps {
  contentUrl: string
  fallbackComponent?: ReactNode
}

export function Markdown({ contentUrl, fallbackComponent }: PageProps) {
  const loadContent = useCallback(
    () => getParsedFileContentById(contentUrl),
    [contentUrl]
  )

  return (
    <Async promiseFn={loadContent}>
      {({ data, isPending }) => {
        if (isPending) return <Loading />

        if (data?.content) {
          return (
            <StyledMarkdown
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )
        } else {
          if (fallbackComponent) return fallbackComponent
        }
        /**
         * if @param fallbackComponent is null, in case of error do not render
         * not all entries can have content
         */
        return <></>
      }}
    </Async>
  )
}

export default Markdown

export const StyledMarkdown = styled.div([
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
  `,
])
