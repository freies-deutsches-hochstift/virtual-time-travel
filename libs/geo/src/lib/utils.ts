import {
  DeviceLocationEventRes,
  DeviceOrientationEventExtended,
  DeviceOrientationEventRes,
  GeolibGeoJSONPoint,
  LocationOptions,
} from "@virtual-time-travel/geo-types";
import { PermissionStatus } from "@virtual-time-travel/util-device";
import * as geolib from "geolib";

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

const requestGeolocationPermission = (
  options: LocationOptions,
  onSuccess: PositionCallback,
  onError: PositionErrorCallback,
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
    endBearing,
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
    alpha: anyAlpha?.toFixed(0) || 0,
    beta: beta?.toFixed(0) || 0,
    gamma: gamma?.toFixed(0) || 0,
    compassHeading: (
      webkitCompassHeading ||
      Math.abs(anyAlpha - 360) ||
      0
    ).toFixed(0),
    /**
     * if the device has no compass or webkitCompassHeading is missing
     * will use alpha as fallback
     * alpha though is much more sensitive and it constanly
     * changes even if the device is still
     * in this case will have to further interpolate the value
     * to avoid hectical movments
     */
    usesRealCompass: typeof webkitCompassHeading === "number",
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
    timestamp: new Date().getTime(),
  } as DeviceLocationEventRes;
};

/**
 * Get pov bearing distance
 * A compass bearing is the clockwise angle measurement between a given point and true north on a compass.
 * see also https://www.movable-type.co.uk/scripts/latlong.html
 */

const getBearingDistance = (
  lonlatA: GeolibGeoJSONPoint,
  lonlatB: GeolibGeoJSONPoint,
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

interface GeolibGeoJSONPointRefined {
  timestamp: number;
  variance: number;
  longitude: number;
  latitude: number;
  accuracy: number;
}

export const refineLocation = (
  locA: DeviceLocationEventRes,
  locZ: DeviceLocationEventRes,
  measurementNoise: number,
) => {
  const location = {
    timestamp: locA.timestamp,
    variance: 0,
    longitude: locA.coordinates[0],
    latitude: locA.coordinates[0],
    accuracy: locA.accuracy,
  } as GeolibGeoJSONPointRefined;

  const lastLocation = {
    timestamp: locZ.timestamp,
    variance: 0,
    longitude: locZ.coordinates[0],
    latitude: locZ.coordinates[0],
    accuracy: locZ.accuracy,
  } as GeolibGeoJSONPointRefined;

  const accuracy = Math.max(location.accuracy, 1);
  const result = { ...location, ...lastLocation };
  if (!lastLocation) {
    result.variance = accuracy * accuracy;
  } else {
    const timestampInc = location.timestamp - lastLocation.timestamp;
    if (timestampInc > 0) {
      // We can tune the velocity and particularly the coefficient at the end
      const velocity =
        (_calculateGreatCircleDistance(location, lastLocation) / timestampInc) *
        measurementNoise;
      result.variance += (timestampInc * velocity * velocity) / 1000;
    }
    const k = result.variance / (result.variance + accuracy * accuracy);
    result.latitude += k * (location.latitude - lastLocation.latitude);
    result.longitude += k * (location.longitude - lastLocation.longitude);
    result.variance = (1 - k) * result.variance;
  }

  return {
    ...location,
    ...{ coordinates: [result.longitude, result.latitude] },
  } as DeviceLocationEventRes;
};

const _toRadians = (n: number) => (n * Math.PI) / 180;

const _calculateGreatCircleDistance = (
  locationA: GeolibGeoJSONPointRefined,
  locationZ: GeolibGeoJSONPointRefined,
) => {
  const lat1 = locationA.latitude;
  const lon1 = locationA.longitude;
  const lat2 = locationZ.latitude;
  const lon2 = locationZ.longitude;

  // DOCUMENTATION: http://www.movable-type.co.uk/scripts/latlong.html
  const p1 = _toRadians(lat1);
  const p2 = _toRadians(lat2);
  const deltagamma = _toRadians(lon2 - lon1);
  const R = 6371e3; // gives d in metres
  const d =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma),
    ) * R;

  return isNaN(d) ? 0 : d;
};

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
