import styled from "@emotion/styled";
import tw from "twin.macro";

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
      line-height: 1.4em;
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
    w-1/3 bg-ui-cards-highlight-a
  `,
  `
    aspect-ratio: 1/1;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
]);

export const StyledCardDetails = styled.div(() => [
  tw`
      absolute inset-0 z-top flex items-center justify-center
    `,
]);

export const StyledCardDetailsInner = styled.div(() => [
  tw`
      w-full max-w-app h-full
      bg-ui-cards-details-bg text-ui-cards-details
      flex flex-col
    `,
]);

export const StyledCardDetailsContent = styled.div(() => [
  tw`
      w-full h-full overflow-hidden relative
    `,
]);
