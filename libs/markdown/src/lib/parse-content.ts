import MarkdownIt from 'markdown-it';
import mdContainerPlugin from 'markdown-it-container';
import linkAttributesPlugin from 'markdown-it-link-attributes';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(linkAttributesPlugin, {
  matcher(href: string) {
    return href.startsWith('https:') || href.startsWith('http:');
  },
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
});

md.use(mdContainerPlugin, 'splash');

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

  return { content: md.render(data) };
}
