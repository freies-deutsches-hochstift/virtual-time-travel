/**
 * A wrapper for navigator.geolocation handling feature availability and permissions gracefully
 */

import { useState } from 'react';

export function useLocation() {
  type State = 'unknown' | 'denied' | 'granted' | 'unavailable';
  const [state, setState] = useState<State>('unknown');
  const available = typeof DeviceOrientationEvent !== 'undefined';
  const [geolocationPosition, setGeolocationPosition] =
    useState<GeolocationPosition>();

  function handlePositionError(error: GeolocationPositionError) {
    switch (error.code) {
      case 1:
        setState('denied');
        break;
      case 2:
        console.warn(
          'Acquisition of the geolocation failed because at least one internal source of position returned an internal error.',
          error
        );
        setState('unknown');
        break;
      case 3:
        // TODO Should we warn the user if we loose GPS?
        console.warn(
          'The time allowed to acquire the geolocation was reached before the information was obtained.',
          error
        );
        break;
      default:
        console.warn('Unknown location error : ', error);
        setState('unknown');
        break;
    }
  }

  function request() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (data) => {
          if (data?.coords !== undefined) {
            setState('granted');
            setGeolocationPosition(data);
          }
        },
        handlePositionError,
        {
          enableHighAccuracy: true,
          timeout: 10000, //Had to up this from 5s on desktop. Doesn't seem like an issue on mobile but check here if slow
          maximumAge: 0,
        }
      );
    }
  }

  return {
    state,
    available,
    request,
    geolocationPosition,
  };
}
