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

export function useOrientation(
  onChange: (event: DeviceOrientationEventRes) => void,
  onRequestComplete?: (res: DeviceResponsePermission) => void
) {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.Unknown
  );

  const handleOrientation = useCallback(
    (event: DeviceOrientationEventExtended) => {
      console.debug('DeviceOrientationEvent::Changed', event);
      onChange(geolocation.getOrientationEventRes(event));
    },
    [onChange]
  );

  const requestOrientation = useCallback(() => {
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
    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [permissionStatus, handleOrientation]);

  return { requestOrientation };
}

export default useOrientation;
