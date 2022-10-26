export enum DeviceFeatures {
  Camera = "camera",
  Geolocation = "geolocation",
  Orientation = "orientation",
}

export enum PermissionStatus {
  Unknown = "unknown",
  Denied = "denied",
  Granted = "granted",
  Unavailable = "unavailable",
}

export interface DeviceResponsePermission {
  status: PermissionStatus;
  error: unknown;
}

export const initialDeviceResponse = {
  status: PermissionStatus.Unknown,
  error: null,
};

export interface DevicePermission extends DeviceResponsePermission {
  permission: DeviceFeatures;
}

export function utilDevice(): string {
  return "util-device";
}

export const IS_IOS =
  navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
  navigator.userAgent.match(/AppleWebKit/);
