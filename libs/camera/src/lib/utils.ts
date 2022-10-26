import { OnDecodeQr } from "@virtual-time-travel/app-router";
import { DialogProps } from "@virtual-time-travel/ui";
import {
  DeviceResponsePermission,
  PermissionStatus,
} from "@virtual-time-travel/util-device";

export interface MediaDeviceRes {
  deviceId?: string;
  stream: MediaStream | null;
  videoConstraints: MediaTrackConstraints;
}

export interface RequestConstraintsOptions {
  audio: MediaTrackConstraints | boolean;
  video: MediaTrackConstraints;
}

export interface CameraProps {
  onRequestCameraComplete?: (res: DeviceResponsePermission) => void;
  requestCameraDialog: DialogProps;
  devicePermissionsStatus: Array<PermissionStatus>;
  onDecodeQr?: OnDecodeQr;
}

export interface CameraResponsePermission extends DeviceResponsePermission {
  status: PermissionStatus;
  device?: MediaDeviceRes | null;
  error: unknown;
}

export const requestPermission = async (
  captureOptions: RequestConstraintsOptions,
): Promise<CameraResponsePermission> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(captureOptions);

    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceId = devices.find((d) => d.kind === "videoinput")?.deviceId;

    console.log(captureOptions?.video);

    return {
      status: PermissionStatus.Granted,
      device: { stream, deviceId, videoConstraints: captureOptions?.video },
      error: null,
    };
  } catch (error) {
    return { status: PermissionStatus.Denied, error };
  }
};

export const camera = { requestPermission };
