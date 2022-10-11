import { forwardRef } from "react"
import styled from '@emotion/styled'
import tw from "twin.macro"

interface VideoProps {
  autoplay?: boolean
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ autoplay }, ref) => {
  return <StyledVideoWrapper>
    <StyledVideo ref={ref} autoPlay={autoplay} playsInline muted />
  </StyledVideoWrapper>
})


const StyledVideoWrapper = styled.div(tw`
  w-full h-full relative overflow-hidden
`)


const StyledVideo = styled.video(tw`
  block w-full h-full object-cover
`)


export default Video
