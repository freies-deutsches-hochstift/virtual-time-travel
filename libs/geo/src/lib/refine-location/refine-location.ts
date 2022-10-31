import { DeviceLocationEventRes } from "@virtual-time-travel/geo-types";

export interface GeolibGeoJSONPointRefined {
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
        (calculateGreatCircleDistance(location, lastLocation) / timestampInc) *
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

const toRadians = (n: number) => (n * Math.PI) / 180;

const calculateGreatCircleDistance = (
  locationA: GeolibGeoJSONPointRefined,
  locationZ: GeolibGeoJSONPointRefined,
) => {
  const lat1 = locationA.latitude;
  const lon1 = locationA.longitude;
  const lat2 = locationZ.latitude;
  const lon2 = locationZ.longitude;

  // DOCUMENTATION: http://www.movable-type.co.uk/scripts/latlong.html
  const p1 = toRadians(lat1);
  const p2 = toRadians(lat2);
  const deltagamma = toRadians(lon2 - lon1);
  const R = 6371e3; // gives d in metres
  const d =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma),
    ) * R;

  return isNaN(d) ? 0 : d;
};
