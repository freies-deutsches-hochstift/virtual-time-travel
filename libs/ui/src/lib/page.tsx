
import styled from '@emotion/styled'
import tw from 'twin.macro'



export const StyledPage = styled.div(
  [
    tw`
      w-full h-full
      pt-16 px-10
      max-w-app
      overflow-y-auto
    `,
    `
      mask-image: linear-gradient(to bottom, transparent 0, black var(--top-mask-size, 0), black calc(100% - var(--bottom-mask-size, 0)), transparent 100%);
    `
  ],

)

export const StyledPageGroup = styled.div(tw`
  w-full
  pt-16
`)


export const StyledPageDivider = styled.div(tw`
  w-full
  pt-8
`)
