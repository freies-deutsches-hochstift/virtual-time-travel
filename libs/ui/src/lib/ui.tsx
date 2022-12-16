import styled from "@emotion/styled";
import tw from "twin.macro";
import { StyledMarkdownContent } from "./markdown";

export const StyledCards = styled.div(tw`
  flex flex-col gap-2
`);

export const StyledCard = styled.div([
  tw`
    flex gap-2 p-2 
    bg-ui-cards-bg text-ui-cards
    text-xs
  `,
  `
    border: var(--ui-cards-border);
    filter: var(--ui-catds-filter);
  `,
]);

export const StyledCardContent = styled.div([
  tw`
    flex-1 p-2
  `,
  `
    h3 {
      font-size: 1.1rem;
      line-height: 1.25em;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      margin: 0;
    }
  `,
]);

export const StyledCardCover = styled.div([
  tw`
    bg-ui-cards-placeholder relative
    w-28 h-28
    landscape:h-24
    landscape:w-40
  `,
  `
    & img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
]);

export const StyledCardDetailsInner = styled.div(() => [
  tw`
      w-full max-w-app h-full
      bg-ui-cards-details-bg text-ui-cards-details
      flex flex-col
      landscape:flex-row
    `,

  `
    @media (orientation: landscape) {
      padding-left: env(safe-area-inset-left, 0)
    }
    `,
]);

export const StyledCardDetailsContent = styled.div(() => [
  tw`
      w-full h-full overflow-hidden relative
  `,
  ` 
    ${StyledMarkdownContent}  {
      padding: 1.5rem;
    }
    
    ${StyledMarkdownContent} h1 {
      font-size: 1.8rem;
      line-height: 1.25em;
      margin: 0 0 2rem 0;
    }

    ${StyledMarkdownContent} h2 {
      font-size: 1.8rem;
      line-height: 1.25em;
      margin: 0 0 2rem 0;
    }

    ${StyledMarkdownContent} .as-figure {
      width: calc(100% + 3rem);
      max-width: calc(100% + 3rem);
      margin: 0 -1.5rem;
    }

    ${StyledMarkdownContent} p {
      margin: 0 0 1.5rem 0;
    }
  `,
]);
