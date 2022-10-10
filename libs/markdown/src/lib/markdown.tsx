import { useCallback } from 'react'
import Async from "react-async"
import { getParsedFileContentById } from './parse-content'

export interface PageProps {
  contentUrl: string
}

export function Markdown(props: PageProps) {
  const { contentUrl } = props
  const loadContent = useCallback(() => getParsedFileContentById(contentUrl), [contentUrl])


  return (
    <Async promiseFn={loadContent}>
      {({ data, error, isLoading }) => {
        if (isLoading) return "Loading..."
        if (error) return `Something went wrong: ${error.message}`
        if (data?.content)
          return (
            <div className="from-markdown" dangerouslySetInnerHTML={{ __html: data.content }} />
          )
        return null
      }}
    </Async>
  )
}

export default Markdown
