import {
  CurrentPov,
  DeviceLocationEventRes,
  FenceId,
  GeoState,
  PovId,
} from "@virtual-time-travel/geo-types";
import { getDistance, isPointInPolygon } from "geolib";
import { getBearingDistance, getCurrentPosition, getLongLat } from "./geo";

/**
 * find first geofence avail depending by current position
 */

export const getCurrentFence = (
  fences: Array<FenceId>,
  position: DeviceLocationEventRes,
) => {
  if (!position) return null;

  return fences?.find(
    (fence) =>
      !!fence.geometry.coordinates.find(
        (geometry) =>
          !!isPointInPolygon(getCurrentPosition(position), geometry),
      ),
  );
};

/**
 * find closest Pov depending by current position
 */

export const getClosestPovInView = (povs: Array<CurrentPov>) =>
  povs
    ?.filter((p) => p.inView)
    .sort((a, b) => (a?.distance || 99999) - (b?.distance || 99999))
    .pop();

/**
 * extends avail povs with ar infos depending by current position and device orientation
 */

export const getEnhancedPovs = (
  geoState: GeoState,
  povs: Array<PovId>,
  inViewThresholdDistance: number,
  inViewThresholdAngle: number,
) => {
  const { position, orientation } = geoState;
  if (!position) return [];

  return (povs || []).map((pov) => {
    const bearingViewportOrientation =
      (orientation?.compassHeading || 0) - (pov.orientation || 0);

    let normalizedBearingViewportOrientation = bearingViewportOrientation;

    if (normalizedBearingViewportOrientation < 0)
      normalizedBearingViewportOrientation += 360;

    const distance = getDistance(
      getCurrentPosition(position),
      getLongLat(pov.geometry.coordinates),
    );

    const bearingDistance = getBearingDistance(
      position.coordinates,
      pov.geometry.coordinates,
    );

    return {
      ...pov,
      distance,
      bearingDistance,
      bearingViewportOrientation: normalizedBearingViewportOrientation,
      inView: distance < inViewThresholdDistance,
      inDirectView: Math.abs(bearingViewportOrientation) < inViewThresholdAngle,
    };
  });
};
