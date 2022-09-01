/**
 * A wrapper for DeviceOrientationEvent handling feature availability and permissions gracefully
 */

import { useMemo, useState } from 'react';

/**
 * Extend native Web API DeviceOrientationEvent event for iOS devices
 * https://stackoverflow.com/questions/60640018/devicemotionevent-request-permission-with-typescript
 */
export interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  webkitCompassAccuracy?: number | undefined;
  webkitCompassHeading?: number | undefined;
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export function useDeviceOrientation() {
  type State = 'unknown' | 'denied' | 'granted' | 'unavailable';
  const [state, setState] = useState<State>('unknown');
  const [rawData, setRawData] = useState<
    DeviceOrientationEventiOS | undefined
  >();
  const available = typeof DeviceOrientationEvent !== 'undefined';

  const [compassHeading, compassAccuracy] = useMemo(() => {
    if (rawData) {
      return [rawData.webkitCompassHeading, rawData.webkitCompassAccuracy];
    } else {
      return [undefined, undefined];
    }
  }, [rawData]);

  /**
   * Request access to DeviceOrientationEvents
   * Warning : This usually needs to be requested via a user interaction
   * ie. via a onClick
   * @date 8/30/2022 - 2:20:03 PM
   */
  function request() {
    if (available) {
      const requestPermission = (
        DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
      ).requestPermission;

      const iOS = typeof requestPermission === 'function';
      //iOS 13+
      if (iOS) {
        requestPermission()
          .then((permissionState: State) => {
            console.log(`permissionState ${permissionState}`);
            setState(permissionState);
            if (permissionState === 'granted') {
              window.addEventListener(
                'deviceorientation',
                (data: DeviceOrientationEventiOS) => {
                  setRawData(data);
                }
              );
            }
          })
          .catch(console.error);
      } else {
        // TODO Add support for Android
        // TODO Check if we need to / can support iOS below 13
        console.warn('Oh no im not iOS13+!');
        // DeviceMotionEvent.initDeviceMotionEvent().then((e) => console.log(e));
        // handle regular non iOS 13+ devices
      }
    } else {
      console.warn(
        'DeviceOrientationEvent not available on this device! Check availability before requesting with orientationAvailable'
      );
    }
  }

  return {
    state,
    available,
    request,
    compassHeading,
    compassAccuracy,
    rawData,
  };
}
