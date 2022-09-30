import * as geolib from 'geolib';

import { PermissionStatus } from '@virtual-time-travel/util-device';

/**
 * Extend native Web API DeviceOrientationEvent event for iOS devices
 * https://stackoverflow.com/questions/60640018/devicemotionevent-request-permission-with-typescript
 */
export interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassAccuracy?: number | undefined;
  webkitCompassHeading?: number | undefined;
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export interface DeviceOrientationEventRes {
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  compassHeading: number | null;
  compassAccuracy: number | null;
}

export interface DeviceLocationEventRes {
  coords: [number, number];
  accuracy: number;
}

export type StatePosition = DeviceLocationEventRes | null;
export type StateOrientation = DeviceOrientationEventRes | null;

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
    error: error.message,
  };
};

const requestPermission = (
  options: LocationOptions,
  onSuccess: PositionCallback,
  onError: PositionErrorCallback
) => {
  return navigator.geolocation.watchPosition(onSuccess, onError, options);
};

const clearRequest = (watchId: number) => {
  navigator.geolocation.clearWatch(watchId);
};

/**
 * Calculates the Bearing Delta between the direction the user is facing and the
 * bearing to the target in degrees
 * @param  {number} startBearing Direction From
 * @param  {number} endBearing Direction To
 * @return {array} [deltaClockwise, deltaCounterClockwise] Returns an array of the deltas
 * in clockwise and counterClockwise directions in degrees(on the compass)
 */
const getBearingDelta = (startBearing: number, endBearing: number) => {
  const delta = endBearing - startBearing;
  const clockwise = endBearing - startBearing + (delta < 0 ? 360 : 0);
  const counterClockwise = endBearing - startBearing - (delta < 0 ? 0 : 360);
  return [clockwise, counterClockwise];
};

/**
 * Calculates the Bearing Delta between the direction the user is facing and the
 * bearing to the target in degrees and unitizes where CW rotation is positive and
 * CCW rotation is negative
 * @param  {number} startBearing Direction From
 * @param  {number} endBearing Direction To
 * @return {number} Returns a unitized value where :
 *      1  is 180 degrees CW  rotation
 *     0.5 is 90  degrees CW  rotation
 * and -1 is 180 degrees CCW rotation
 *
 */
const getBearingDeltaUnit = (startBearing: number, endBearing: number) => {
  const [clockwise, counterClockwise] = getBearingDelta(
    startBearing,
    endBearing
  );
  if (clockwise <= Math.abs(counterClockwise)) {
    return clockwise / 180;
  } else {
    return counterClockwise / 180;
  }
};

/**
 * type DeviceOrientationEvent is not serializable
 * therefore we need to convert it in order to be fully usable
 */

const getOrientationEventRes = (event: DeviceOrientationEventExtended) => {
  const { alpha, beta, gamma, webkitCompassHeading, webkitCompassAccuracy } =
    event;
  return {
    alpha,
    beta,
    gamma,
    compassHeading: webkitCompassHeading,
    compassAccuracy: webkitCompassAccuracy,
  } as DeviceOrientationEventRes;
};

/**
 * type GeolocationPosition is not serializable
 * therefore we need to convert it in order to be fully usable
 */

const getPositionEventRes = (position: GeolocationPosition) => {
  if (!position?.coords) return null;

  return {
    coords: [position.coords.latitude, position.coords.longitude],
    accuracy: position.coords.accuracy,
  } as DeviceLocationEventRes;
};

export const geolocation = {
  requestPermission,
  clearRequest,
  getDistance: geolib.getDistance,
  isPointInPolygon: geolib.isPointInPolygon,
  getBearingDelta,
  getBearingDeltaUnit,
  getOrientationEventRes,
  getPositionEventRes,
};
