import {
  DeviceLocationEventRes,
  DeviceOrientationEventExtended,
  DeviceOrientationEventRes,
  GeolibGeoJSONPoint,
  LocationOptions,
} from '@virtual-time-travel/geo-types';
import { PermissionStatus } from '@virtual-time-travel/util-device';
import * as geolib from 'geolib';

export const geolocationDefaultOptions: LocationOptions = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0,
};

export const geolocationErrors = [PermissionStatus.Denied];

export const handleGeolocationError = (error: GeolocationPositionError) => {
  return {
    status: geolocationErrors[error.code] || PermissionStatus.Unavailable,
    error: error.message,
  };
};

const requestGeolocationPermission = (
  options: LocationOptions,
  onSuccess: PositionCallback,
  onError: PositionErrorCallback
) => {
  return navigator.geolocation.watchPosition(onSuccess, onError, options);
};

const clearGeolocationRequest = (watchId: number) => {
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
  const { alpha, beta, gamma, webkitCompassHeading } = event;
  const anyAlpha = alpha || 0;

  return {
    alpha: anyAlpha?.toFixed(1),
    beta: beta?.toFixed(1),
    gamma: gamma?.toFixed(1),
    compassHeading: webkitCompassHeading || Math.abs(anyAlpha - 360) || 0,
  } as unknown as DeviceOrientationEventRes;
};

/**
 * type GeolocationPosition is not serializable
 * therefore we need to convert it in order to be fully usable
 */

const getPositionEventRes = (position: GeolocationPosition) => {
  if (!position?.coords) return null;

  return {
    coordinates: [position.coords.longitude, position.coords.latitude],
    accuracy: position.coords.accuracy,
  } as DeviceLocationEventRes;
};

/**
 * Get pov bearing distance
 * A compass bearing is the clockwise angle measurement between a given point and true north on a compass.
 * see also https://www.movable-type.co.uk/scripts/latlong.html
 */

const getBearingDistance = (
  lonlatA: GeolibGeoJSONPoint,
  lonlatB: GeolibGeoJSONPoint
) => {
  const toDegrees = (radians: number) => {
    return radians * (180 / Math.PI);
  };

  const toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  const latA = toRadians(lonlatA[1] as number);
  const latB = toRadians(lonlatB[1] as number);
  const lonDelta = toRadians((lonlatB[0] as number) - (lonlatA[0] as number));

  // prevent double sin/cos calculations
  const sinlatA = Math.sin(latA);
  const coslatA = Math.cos(latA);
  const sinlatB = Math.sin(latB);
  const coslatB = Math.cos(latB);
  const coslonDelta = Math.cos(lonDelta);

  // distance
  // const R = 6371e3 // earth radius in meters
  // const distance = Math.acos(sinlatA * sinlatB + coslatA * coslatB * coslonDelta) * R

  // initial bearing
  const y = Math.sin(lonDelta) * coslatB;
  const x = coslatA * sinlatB - sinlatA * coslatB * coslonDelta;
  let bearing = toDegrees(Math.atan2(y, x));

  if (bearing < 0) bearing += 360;

  return bearing;
};

const getLongLat = (coordinates: GeolibGeoJSONPoint) => ({
  longitude: coordinates[0],
  latitude: coordinates[1],
});

export const geolocation = {
  requestGeolocationPermission,
  clearGeolocationRequest,
  getDistance: geolib.getDistance,
  isPointInPolygon: geolib.isPointInPolygon,
  getBearingDistance,
  getBearingDelta,
  getBearingDeltaUnit,
  getOrientationEventRes,
  getPositionEventRes,
  getLongLat,
};
