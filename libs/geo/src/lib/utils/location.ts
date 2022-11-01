import {
  DeviceLocationEventRes,
  LocationOptions,
} from "@virtual-time-travel/geo-types";
import { PermissionStatus } from "@virtual-time-travel/util-device";

export const geolocationDefaultOptions: LocationOptions = {
  enableHighAccuracy: false,
  timeout: 30000,
  maximumAge: 5000,
};

export const geolocationErrors = [PermissionStatus.Denied];

export const handleGeolocationError = (error: GeolocationPositionError) => {
  return {
    status: geolocationErrors[error.code] || PermissionStatus.Unavailable,
    error: error.message,
  };
};

export const requestGeolocationPermission = (
  options: LocationOptions,
  onSuccess: PositionCallback,
  onError: PositionErrorCallback,
) => {
  return navigator.geolocation.watchPosition(onSuccess, onError, options);
};

export const clearGeolocationRequest = (watchId: number) => {
  navigator.geolocation.clearWatch(watchId);
};

/**
 * type GeolocationPosition is not serializable
 * therefore we need to convert it in order to be fully usable
 */

export const getPositionEventRes = (position: GeolocationPosition) => {
  if (!position?.coords) return null;

  return {
    coordinates: [position.coords.longitude, position.coords.latitude],
    accuracy: position.coords.accuracy,
    timestamp: new Date().getTime(),
  } as DeviceLocationEventRes;
};
