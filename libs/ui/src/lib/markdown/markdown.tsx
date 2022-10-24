/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback } from "react";
import Async from "react-async";
import { Loading } from "@virtual-time-travel/loading";
import { getParsedFileContentById } from "@virtual-time-travel/markdown";
import MarkdownContents from "./markdown-contents";

export interface MarkdownProps {
  contentUrl: string;
  asSlideshow?: boolean;
  fallbackComponent?: ReactNode;
  actions?: ReactNode;
  labels?: { [key: string]: string };
}

export function Markdown({
  contentUrl,
  asSlideshow,
  fallbackComponent,
  actions,
  labels,
}: MarkdownProps) {
  const loadContent = useCallback(
    () => getParsedFileContentById(contentUrl),
    [contentUrl],
  );

  return (
    <Async promiseFn={loadContent}>
      {({ data, isPending }) => {
        if (isPending) return <Loading />;

        if (data?.contents?.length) {
          return (
            <MarkdownContents
              {...{ contents: data?.contents, asSlideshow, actions, labels }}
            />
          );
        } else {
          if (fallbackComponent) return fallbackComponent;
        }

        /**
         * if @param fallbackComponent is null, in case of error do not render
         * not all entries can have content
         */
        return <></>;
      }}
    </Async>
  );
}

export default Markdown;
