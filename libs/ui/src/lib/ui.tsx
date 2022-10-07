import styled from '@emotion/styled'
import tw from "twin.macro"


export const StyledCards = styled.div(tw`
  flex flex-col gap-2
`)


export const StyledCard = styled.div(tw`
  flex gap-2 p-2
`)

export const StyledCardContent = styled.div(tw`

`)

export const StyledCardCover = styled.div([
  tw`
    w-1/3
  `,
  `
    aspect-ratio: 1/1;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `
])