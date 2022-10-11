
import { useCallback } from 'react'
import Async from "react-async"
import { Loading } from '@virtual-time-travel/loading'
import { getParsedFileContentById } from './parse-content'

export interface PageProps {
  contentUrl: string
}

export function Markdown(props: PageProps) {
  const { contentUrl } = props
  const loadContent = useCallback(() => getParsedFileContentById(contentUrl), [contentUrl])


  return (
    <Async promiseFn={loadContent}>
      {({ data }) => {
        if (data?.content)
          return (
            <div className="markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
          )

        return <Loading />
      }}
    </Async>
  )
}

export default Markdown
