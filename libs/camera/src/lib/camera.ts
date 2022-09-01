import { useState } from 'react';

export function useCamera() {
  type State = 'unknown' | 'denied' | 'granted' | 'unavailable';
  const [state, setState] = useState<State>('unknown');

  const available = true; // TODO Implement constraint based checker

  function request(
    element?: HTMLVideoElement | null,
    constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        facingMode: { ideal: 'environment' },
      },
    }
  ) {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setState('granted');
          console.log('typeof element', typeof element);

          // typeof element == 'HTMLVideoElement'
          if (element) {
            element.srcObject = stream;
          }
        })
        .catch((error) => {
          setState('denied');
          console.warn(`Failed to bind UserMedia stream to HTML Video Element`);
          console.warn(error);
        });
    }
  }

  return {
    state,
    available,
    request,
  };
}
