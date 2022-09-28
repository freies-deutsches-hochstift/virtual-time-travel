import { useRef, useEffect } from 'react';
import { useUserMedia } from '../camera';
import { CaptureOptions } from '../types';

import styles from './camera-stream.module.scss';

export interface CameraStreamProps {
  captureOptions?: CaptureOptions,
  debug?: boolean
}

export const CameraStream = (props: CameraStreamProps) => {
  const { debug } = props
  const videoElRef = useRef<HTMLVideoElement>(null);

  const { mediaStream, status } = useUserMedia();

  useEffect(() => {
    if (!videoElRef.current) return
    videoElRef.current.srcObject = mediaStream;
  }, [mediaStream])


  return (
    <div className={styles['camera-stream']}>
      <video className={styles['camera-stream__video']}
        ref={videoElRef}
        autoPlay
        playsInline
        muted
      />
      {debug && <div className={styles['camera-stream__debug']}>Permission status: {status}</div>}
    </div>
  );
};


