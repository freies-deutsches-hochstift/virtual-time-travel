import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import useResizeObserver from "use-resize-observer";

export const Scrollable = ({ children }: PropsWithChildren) => {
  const ctnRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { height = 0 } = useResizeObserver<HTMLDivElement>({
    ref: scrollRef,
  });

  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [isScrollTop, setIsScrollTop] = useState<boolean>(false);
  const [useMask, setUseMask] = useState<boolean>(true);

  const handleScroll = () => {
    if (!ctnRef.current || !isScrollable) return;

    setIsScrollTop(ctnRef.current.scrollTop === 0);
  };

  const showMask = () => {
    setUseMask(true);
  };

  const hideMask = () => {
    setUseMask(false);
  };

  useEffect(() => {
    if (!ctnRef?.current) return;
    // + 1 to avoid crossbrowser math round issues
    const canScroll =
      ctnRef.current.scrollHeight > ctnRef.current.offsetHeight + 1;
    setIsScrollable(canScroll);
    setIsScrollTop(canScroll);
  }, [height]);

  useEffect(() => {
    window.addEventListener("setZoom", hideMask);
    window.addEventListener("unsetZoom", showMask);
    return () => {
      window.removeEventListener("setZoom", hideMask);
      window.removeEventListener("unsetZoom", showMask);
    };
  }, []);

  return (
    <StyledScrollableCtn
      ref={ctnRef}
      {...{ isScrollable, isScrollTop, useMask }}
      onScroll={handleScroll}
    >
      <StyledScrollable ref={scrollRef} {...{ isScrollable }}>
        {children}
      </StyledScrollable>
    </StyledScrollableCtn>
  );
};

export interface StyledScrollableCtnProps {
  isScrollTop?: boolean;
  isScrollable?: boolean;
  useMask?: boolean;
}

export const StyledScrollableCtn = styled.div(
  ({ isScrollTop, isScrollable, useMask }: StyledScrollableCtnProps) => [
    tw`
      w-full h-full flex flex-col flex-nowrap
      overflow-y-auto
    `,

    isScrollable && `mask-image: var(--page-scrollmask);`,
    isScrollTop && `mask-image: var(--page-scrollmask-bottom);`,
    !useMask && `mask-image: none; overflow: hidden;`,
  ],
);

export interface StyledScrollableProps {
  isScrollable?: boolean;
}

export const StyledScrollable = styled.div(
  ({ isScrollable }: StyledScrollableProps) => [
    tw`w-full flex-1 flex flex-col relative`,
    isScrollable && `padding-bottom: var(--bottom-mask-size);`,
  ],
);

export default Scrollable;
