/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { uid } from "react-uid";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import tw from "twin.macro";
import Scrollable from "../scrollable/scrollable";
import MarkdownInlineActions from "./markdown-inline-actions";
import MarkdownSlideshowActions from "./markdown-slideshow-actions";

export type MarkdownContents = Array<string>;
export type MarkdownLabels = { [key: string]: string };
export type MarkdownActions = ReactNode;
export type MarkdownAsSlideshow = boolean;

export interface MarkdownContentsProps {
  contents?: MarkdownContents;
  asSlideshow?: MarkdownAsSlideshow;
  actions?: MarkdownActions;
  labels?: MarkdownLabels;
}

const slideshowVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

export function MarkdownContents({
  contents = [],
  asSlideshow,
  actions,
  labels,
}: MarkdownContentsProps) {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const hasSlides = useMemo(() => contents.length > 1, [contents]);
  const contentIndex = wrap(0, contents.length, currentSlide);
  const activeSlideshow = useMemo(
    () => hasSlides && asSlideshow,
    [hasSlides, asSlideshow],
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
  });

  const isLastSlide = useMemo(
    () => currentSlide === contents.length - 1,
    [currentSlide, contents],
  );

  const paginate = (newDirection: number) => {
    if (!activeSlideshow) return;
    setCurrentSlide([currentSlide + newDirection, newDirection]);
  };

  const onNext = useCallback(() => {
    if (!isLastSlide) setCurrentSlide([currentSlide + 1, 1]);
  }, [isLastSlide, currentSlide]);

  return (
    <StyledMarkdownWrapper {...{ hasSlides }}>
      {activeSlideshow && (
        <MarkdownSlideshowActions
          {...{ contents, contentIndex, setCurrentSlide }}
        />
      )}
      <StyledMarkdownContents {...swipeHandlers}>
        <AnimatePresence initial={false} custom={direction}>
          <StyledMarkdown
            custom={direction}
            variants={slideshowVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            key={uid(contentIndex)}
          >
            <Scrollable>
              <StyledMarkdownContent
                dangerouslySetInnerHTML={{ __html: contents[contentIndex] }}
              />
            </Scrollable>
          </StyledMarkdown>
        </AnimatePresence>
      </StyledMarkdownContents>

      {!asSlideshow && (
        <MarkdownInlineActions {...{ isLastSlide, onNext, actions, labels }} />
      )}
    </StyledMarkdownWrapper>
  );
}

export default MarkdownContents;

type StyledMarkdownWrapperProps = {
  hasSlides: boolean;
};

export const StyledMarkdownWrapper = styled.div(
  ({ hasSlides }: StyledMarkdownWrapperProps) => [
    hasSlides && tw`absolute inset-0 overflow-hidden min-h-full flex flex-col`,
    hasSlides &&
      `
    ${StyledMarkdown} {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
  `,
  ],
);

export const StyledMarkdownContents = styled.div(() => [
  tw`w-full flex-1 relative overflow-hidden flex flex-col`,
]);

export const StyledMarkdown = styled(motion.div)(() => [
  tw`w-full flex-1 relative overflow-hidden flex flex-col`,
]);

export const StyledMarkdownContent = styled.div(() => [
  `
    min-height: 100%;

    h1 {
      font-size: 3rem;
      line-height: 1.25em;
      margin: 2rem 0;
    }
    
    h2 {
      font-size: 2rem;
      line-height: 1.25em;
      margin: 0 0 2rem 0;
    }
    
    h3 {
      font-size: 1.1rem;
      line-height: 1.25em;
      margin: 0 0 1rem 0;
    }

    h4, h5, h6, p {
      margin: 0 0 .5rem 0;
    }

    hr {
      margin: 2rem 0;
    }

    ul, ol {
      margin: 0 0 2rem 2rem;
    }

    ul {
      list-style-type: circle;
    }

    ul li:not(:last-child) {
      margin-bottom: 1em;
    }

    ol {
      list-style-type: decimal;
    }

    a {
      text-decoration: underline;
      text-underline-offset: .4em;
    }

    > * + p img,
    > * + img {
      padding-top: 1em;
    }

    img {
      user-select: none;
      pointer-events: none;
    }

    .slide {
      position: relative;
      min-height: 100%;
    }

    .background,
    .background > p,
    .background > p > img {
      position: absolute;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    .background {
      inset: -1rem;
      pointer-events: none;
    }
    
    .background > p > img {
      object-fit: cover;
      object-position: top center;
      max-height: none;
    }

  `,
]);
