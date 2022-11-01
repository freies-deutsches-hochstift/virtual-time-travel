/**
 * type DeviceOrientationEvent is not serializable
 * therefore we need to convert it in order to be fully usable
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
  const anyAlpha = alpha || 0;
  const anyBeta = beta || 0;
  const anyGamma = gamma || 0;

  return {
    alpha: anyAlpha.toFixed(0),
    beta: anyBeta.toFixed(0),
    gamma: anyGamma.toFixed(0),
    compassHeading: (
      webkitCompassHeading ||
      compassHeadingFromEuler(anyAlpha, anyBeta, anyGamma)
    ).toFixed(0),
  } as unknown as DeviceOrientationEventRes;
};
