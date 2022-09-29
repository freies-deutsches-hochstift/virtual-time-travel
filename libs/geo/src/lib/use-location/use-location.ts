import { useCallback, useEffect } from 'react';

import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';

import {
  geolocation,
  geolocationDefaultOptions,
  LocationOptions,
  Position,
} from '../utils';

export function useLocation(
  onChange: (pos: Position) => void,
  onRequestComplete?: (res: DeviceResponsePermission) => void,
  options: LocationOptions = geolocationDefaultOptions
) {
  const onSuccess = useCallback(
    (pos: Position) => {
      onChange(pos);
      if (onRequestComplete)
        onRequestComplete({ status: PermissionStatus.Granted, error: null });
    },
    [onRequestComplete, onChange]
  );

  const onError = useCallback(
    (res: unknown) => {
      if (onRequestComplete) onRequestComplete(res as DeviceResponsePermission);
    },
    [onRequestComplete]
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      if (onRequestComplete)
        onRequestComplete({
          status: PermissionStatus.Unavailable,
          error: null,
        });
    }

    const watchId = geolocation.requestPermission(options, onSuccess, onError);
    return () => {
      if (watchId) geolocation.clearRequest(watchId);
    };
  }, [options, onSuccess, onError, onRequestComplete]);

  return {};
}

export default useLocation;
