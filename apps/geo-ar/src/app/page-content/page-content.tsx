/* eslint-disable react/jsx-no-useless-fragment */
import { Markdown } from '@virtual-time-travel/ui';
import { usePageByIdentifier } from '../hooks/usePageByIdentifier';

interface PageContentProps {
  identifier: string;
}

export function PageContent({ identifier }: PageContentProps) {
  const page = usePageByIdentifier(identifier);

  if (!page || !page?.contentUrl) return <></>;

  const { contentUrl } = page;

  return <Markdown {...{ contentUrl }} />;
}

export default PageContent;
