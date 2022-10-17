import { marked } from 'marked';

export interface FetchMarkdownRes {
  content?: string;
}

export async function getParsedFileContentById(
  contentUrl: string
): Promise<FetchMarkdownRes> {
  const response = await fetch(contentUrl);
  const data = await response.text();

  if (!response.ok) {
    return {};
  }

  return { content: marked.parse(data) };
}
