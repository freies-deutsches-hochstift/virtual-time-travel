
import { ReactNode, useCallback } from 'react'
import Async from "react-async"
import { Loading } from '@virtual-time-travel/loading'
import { getParsedFileContentById } from './parse-content'

export interface PageProps {
  contentUrl: string,
  fallbackComponent?: ReactNode
}

export function Markdown({ contentUrl, fallbackComponent }: PageProps) {
  const loadContent = useCallback(() => getParsedFileContentById(contentUrl), [contentUrl])

  return (
    <Async promiseFn={loadContent}>
      {({ data, error }) => {
        if (data?.content)
          return (
            <div className="markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
          )

        if (error && !!fallbackComponent) return fallbackComponent

        return <Loading />
      }}
    </Async>
  )
}

export default Markdown
