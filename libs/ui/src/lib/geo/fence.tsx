import styled from '@emotion/styled'
import tw from "twin.macro"


export interface FenceProps {
  fenceTitle: string
}


const StyledFence = styled.div(tw`
  absolute bottom-0 left-0 w-full
`)

export function Fence({ fenceTitle }: FenceProps) {

  return (
    <StyledFence>
      <span>{fenceTitle}</span>
    </StyledFence>
  )
}

export default Fence
