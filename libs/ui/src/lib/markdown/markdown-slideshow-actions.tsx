/* eslint-disable react/jsx-no-useless-fragment */
import { uid } from "react-uid";
import styled from "@emotion/styled";
import tw from "twin.macro";
import MarkdownContents from "./markdown-contents";

export interface MarkdownSlideshowActionsProps {
  contents: MarkdownContents;
  contentIndex: number;
}

export function MarkdownSlideshowActions({
  contents,
  contentIndex,
}: MarkdownSlideshowActionsProps) {
  if (!contents.length || contents.length === 1) return <></>;

  return (
    <StyledMarkdownSlideshowActions>
      {contents.map((c, i) => (
        <StyledMarkdownSlideshowActionsSlide
          current={i === contentIndex}
          key={uid(c)}
        />
      ))}
    </StyledMarkdownSlideshowActions>
  );
}

export default MarkdownSlideshowActions;

export const StyledMarkdownSlideshowActions = styled.div(() => [
  tw`
      py-4 flex gap-1
      justify-center
      items-center
    `,
]);

type StyledMarkdownSlideshowActionsSlideProps = {
  current: boolean;
};

export const StyledMarkdownSlideshowActionsSlide = styled.div(
  ({ current }: StyledMarkdownSlideshowActionsSlideProps) => [
    tw`
      w-2 h-2 rounded-full
      bg-primary-a
      transition-all duration-300
    `,

    current && tw`w-6 bg-primary-b`,
  ],
);
