import { useCallback, useEffect } from 'react';

import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';

export function useOrientation(
  onChange: (event: DeviceOrientationEvent) => void,
  onRequestComplete?: (res: DeviceResponsePermission) => void
) {
  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      onChange(event);
      if (onRequestComplete)
        onRequestComplete({ status: PermissionStatus.Granted, error: null });
    },
    [onRequestComplete, onChange]
  );

  useEffect(() => {
    if (!window.ondeviceorientation) {
      if (onRequestComplete)
        onRequestComplete({
          status: PermissionStatus.Unavailable,
          error: null,
        });
      return;
    }

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation, onRequestComplete]);

  return {};
}

export default useOrientation;
