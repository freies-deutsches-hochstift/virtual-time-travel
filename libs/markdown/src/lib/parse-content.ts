import { marked } from 'marked';

export interface FetchMarkdownRes {
  content: string;
}

export async function getParsedFileContentById(
  id: string | number,
  contentPath: string
): Promise<FetchMarkdownRes> {
  const url = [contentPath, `${id}.md`].join('/');
  const response = await fetch(url);
  const data = await response.text();

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return { content: marked.parse(data) };
}
