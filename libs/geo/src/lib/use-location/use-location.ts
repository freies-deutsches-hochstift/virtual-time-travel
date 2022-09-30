/**
 * A wrapper for navigator.geolocation handling feature availability and permissions gracefully
 */

import { useCallback, useEffect,useState } from 'react';
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';
import {
  DeviceLocationEventRes,
  geolocation,
  geolocationDefaultOptions,
  handleGeolocationError,
  LocationOptions,
} from '../utils';

/**
 * to avoid re-renders we do not want to return position and request status directly from the hook
 * update callbacks
 * @param {(pos: DeviceLocationEventRes) => void} onChange send position to parent app store
 * @param {(res: DeviceResponsePermission) => void} onRequestComplete send auth response to parent app store
 * TODO:
 * verify auth res and feedbacks
 * depending by different propmt results and default settings
 *
 */

export function useLocation(
  onChange: (pos: DeviceLocationEventRes) => void,
  onRequestComplete?: (res: DeviceResponsePermission) => void,
  options: LocationOptions = geolocationDefaultOptions
) {
  const [watchId, setWatchId] = useState<number | null>(null);

  const onSuccess = useCallback(
    (pos: GeolocationPosition) => {
      if (onRequestComplete)
        onRequestComplete({ status: PermissionStatus.Granted, error: null });
      onChange(geolocation.getPositionEventRes(pos) as DeviceLocationEventRes);
    },
    [onRequestComplete, onChange]
  );

  const onError = useCallback(
    (error: GeolocationPositionError) => {
      if (onRequestComplete) onRequestComplete(handleGeolocationError(error));
    },
    [onRequestComplete]
  );

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.debug(
        'Ups ... your browser does not support navigator.geolocation'
      );
      if (onRequestComplete)
        onRequestComplete({
          status: PermissionStatus.Unavailable,
          error: null,
        });
    }

    const wId = geolocation.requestPermission(options, onSuccess, onError);
    console.debug('Watching geolocation id', wId, 'with options: ', options);
    setWatchId(wId);
  }, [onSuccess, onError, onRequestComplete, options]);

  useEffect(() => {
    return () => {
      if (watchId) {
        geolocation.clearRequest(watchId);
        console.debug('Stop Watching geolocation id', watchId);
      }
    };
  }, [watchId]);

  return { requestLocation };
}

export default useLocation;
