import { useState, useEffect, useCallback } from 'react';
import { CaptureOptions, CameraStatus } from './types';

const defaultOptions: CaptureOptions = {
  audio: false,
  video: { facingMode: 'environment' },
};

export const useUserMedia = (options = defaultOptions) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>(CameraStatus.Unknown);

  // const available = true; // TODO Implement constraint based checker

  const requestVideoStream = useCallback(async () => {
    if (mediaStream) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(options);
      setStatus(CameraStatus.Granted);
      setMediaStream(stream);
    } catch (error) {
      setStatus(CameraStatus.Denied);
      console.warn(`Failed to bind UserMedia stream to HTML Video Element`);
      console.warn(error);
    }
  }, [mediaStream, options]);

  useEffect(() => {
    requestVideoStream();
    return () => {
      if (mediaStream)
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
    };
  }, [mediaStream, requestVideoStream]);

  return { mediaStream, status };
};
