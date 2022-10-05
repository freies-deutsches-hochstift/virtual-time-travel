import { useCallback } from 'react'
import Async from "react-async"
import { getParsedFileContentById } from './parse-content'

export interface PageProps {
  id: string | number,
  baseUrl: string
}

export function Markdown(props: PageProps) {
  const { id, baseUrl } = props
  const loadContent = useCallback(() => getParsedFileContentById(id, baseUrl), [id, baseUrl])


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
