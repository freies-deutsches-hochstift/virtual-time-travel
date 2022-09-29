import { PermissionStatus } from '@virtual-time-travel/util-device';

export type Position = GeolocationPosition | null | undefined;

export interface LocationOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export const geolocationDefaultOptions: LocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export const geolocationErrors = [PermissionStatus.Denied];

export const handleGeolocationError = (error: GeolocationPositionError) => {
  return {
    status: geolocationErrors[error.code] || PermissionStatus.Unavailable,
    error,
  };
};

const requestGeolocationPermission = (
  options: LocationOptions,
  onSuccess: PositionCallback,
  onError: PositionErrorCallback
) => {
  return navigator.geolocation.watchPosition(onSuccess, onError, options);
};

const clearRequest = (watchId: number) => {
  navigator.geolocation.clearWatch(watchId);
};

export const geolocation = {
  requestPermission: requestGeolocationPermission,
  clearRequest,
};
