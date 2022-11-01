import { GeolibGeoJSONPoint } from "geolib/es/types";
import { LocalizedKey } from "@virtual-time-travel/localization";

export interface LocationOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

/**
 * Extend native Web API DeviceOrientationEvent event for iOS devices
 * https://stackoverflow.com/questions/60640018/devicemotionevent-request-permission-with-typescript
 */
export interface DeviceOrientationEventExtended extends DeviceOrientationEvent {
  webkitCompassAccuracy?: number | undefined;
  webkitCompassHeading?: number | undefined;
  requestPermission?: () => Promise<"granted" | "denied">;
}

export interface DeviceOrientationEventRes {
  alpha: number;
  beta: number;
  gamma: number;
  compassHeading: number;
  usesRealCompass: boolean;
}

export interface DeviceLocationEventRes {
  coordinates: GeolibGeoJSONPoint;
  accuracy: number;
  timestamp: number;
}

export type StatePosition = DeviceLocationEventRes | null;

export type StateOrientation = DeviceOrientationEventRes | null;

export interface GeoState {
  position: StatePosition;
  orientation: StateOrientation;
}

export interface PovGeometry {
  type: string;
  coordinates: GeolibGeoJSONPoint;
}

export interface PovId {
  id: string | number;
  geometry: PovGeometry;
  fence: string | number;
  cover?: string | null;
  title: string | null | LocalizedKey;
  orientation?: number | null;
}

export interface FenceGeometry {
  type: "Polygon";
  coordinates: Array<Array<GeolibGeoJSONPoint>>;
}

export interface FenceId {
  id: string | number;
  title: string;
  geometry: FenceGeometry;
}

export interface CurrentPov extends PovId {
  distance: number | null;
  bearingDistance: number | null;
  bearingViewportOrientation: number;
  inView: boolean;
  inDirectView: boolean;
}

export interface EnhancedPov extends PovId {
  coverSrc: string | null;
  localizedTitle?: string;
  contentUrl: string;
}

export interface CurrentGeoFence {
  fence: FenceId | undefined;
  povs: Array<CurrentPov>;
}

export { GeolibGeoJSONPoint };