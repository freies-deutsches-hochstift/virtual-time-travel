/**
 * A wrapper for DeviceOrientationEvent handling feature availability and permissions gracefully
 *
 * TODO: DEBOUNCE ORIENTATION EVENT!!!
 */

import { useCallback, useEffect, useState } from 'react';
import {
  DeviceOrientationEventExtended,
  DeviceOrientationEventRes,
} from '@virtual-time-travel/geo-types';
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';
import { geolocation } from '../utils';

const IS_IOS =
  navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
  navigator.userAgent.match(/AppleWebKit/);

const ORIENTATION_EVENT = IS_IOS
  ? 'deviceorientation'
  : ('deviceorientationabsolute' as unknown as keyof WindowEventMap);

export function useOrientation(
  onChange: (event: DeviceOrientationEventRes) => void,
  onRequestComplete?: (res: DeviceResponsePermission) => void
) {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.Unknown
  );

  const handleOrientation = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any): any => {
      // console.debug('DeviceOrientationEvent::Changed', event);
      onChange(geolocation.getOrientationEventRes(event));
    },
    [onChange]
  );

  const requestOrientation = useCallback(() => {
    // if unsupported browser
    if (!window.ondeviceorientationabsolute && !!window.ondeviceorientation) {
      if (onRequestComplete) {
        onRequestComplete({
          status: PermissionStatus.Unavailable,
          error: null,
        });
        return;
      }
    }

    // if android (does not need request permissions)
    if (!IS_IOS && onRequestComplete) {
      onRequestComplete({ status: PermissionStatus.Granted, error: null });
      return;
    }

    // if IOS
    const requestPermission = (
      DeviceOrientationEvent as unknown as DeviceOrientationEventExtended
    ).requestPermission;

    const canRequestPermission = typeof requestPermission === 'function';

    if (!canRequestPermission) {
      if (onRequestComplete) {
        onRequestComplete({
          status: PermissionStatus.Unavailable,
          error: 'Device orientation not supported',
        });
      }
      return;
    }

    requestPermission().then((status) => {
      if (status === 'denied') {
        setPermissionStatus(PermissionStatus.Denied);
        if (onRequestComplete)
          onRequestComplete({ status: PermissionStatus.Denied, error: null });
        return;
      }
      setPermissionStatus(PermissionStatus.Granted);
      if (onRequestComplete)
        onRequestComplete({ status: PermissionStatus.Granted, error: null });
    });
  }, [onRequestComplete]);

  useEffect(() => {
    if (permissionStatus === PermissionStatus.Denied) return;
    window.addEventListener(ORIENTATION_EVENT, handleOrientation);
    return () => {
      window.removeEventListener(ORIENTATION_EVENT, handleOrientation);
    };
  }, [permissionStatus, handleOrientation]);

  return { requestOrientation };
}

export default useOrientation;
