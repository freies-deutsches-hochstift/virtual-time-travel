import styled from '@emotion/styled'
import tw from "twin.macro"


export interface FenceProps {
  fenceTitle: string
}


const StyledFence = styled.div(tw`
  absolute bottom-2 left-2 w-full font-bold
`)

export function Fence({ fenceTitle }: FenceProps) {

  return (
    <StyledFence>
      <span>{fenceTitle}</span>
    </StyledFence>
  )
}

export default Fence
