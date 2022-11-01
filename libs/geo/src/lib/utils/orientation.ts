/**
 * sending only interpolated compassHeading
 */

import {
  DeviceOrientationEventExtended,
  DeviceOrientationEventRes,
} from "@virtual-time-travel/geo-types";
import { compassHeadingFromEuler } from "./compass";

export const getOrientationEventRes = (
  event: DeviceOrientationEventExtended,
) => {
  const { alpha, beta, gamma, webkitCompassHeading } = event;
  return {
    orientationEuler: { alpha, beta, gamma },
    compassHeading:
      webkitCompassHeading ||
      compassHeadingFromEuler(alpha || 0, beta || 0, gamma || 0),
  } as DeviceOrientationEventRes;
};
