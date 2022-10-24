import { memo, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { MediaDeviceRes } from "../utils";

interface CameraStreamProps {
  device: MediaDeviceRes;
}

export const CameraStream = memo((props: CameraStreamProps) => {
  const { device } = props;

  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const { stream } = device;

  useEffect(() => {
    console.log(stream);
    if (!videoElRef.current || !stream) return;
    videoElRef.current.srcObject = stream;

    return () => {
      if (stream)
        stream.getTracks().forEach((track) => {
          track.stop();
        });
    };
  }, [stream]);

  return (
    <StyledVideoWrapper>
      <StyledVideo ref={videoElRef} autoPlay playsInline muted />
    </StyledVideoWrapper>
  );
});

const StyledVideoWrapper = styled.div(tw`
  w-full h-full relative overflow-hidden
`);

const StyledVideo = styled.video(tw`
  block w-full h-full object-cover
`);

export default CameraStream;
