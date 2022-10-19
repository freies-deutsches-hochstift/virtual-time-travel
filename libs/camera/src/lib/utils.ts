import { OnDecodeQr } from '@virtual-time-travel/app-router';
import { DialogProps } from '@virtual-time-travel/ui';
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';

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
  captureOptions?: RequestConstraintsOptions;
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

export const defaultConstraints: RequestConstraintsOptions = {
  audio: false,
  video: {
    facingMode: 'environment',
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerHeight / window.innerWidth,
  },
};

export const requestPermission = async (
  captureOptions?: RequestConstraintsOptions
): Promise<CameraResponsePermission> => {
  try {
    const constraints = captureOptions || defaultConstraints;
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceId = devices.find((d) => d.kind === 'videoinput')?.deviceId;

    return {
      status: PermissionStatus.Granted,
      device: { stream, deviceId, videoConstraints: constraints?.video },
      error: null,
    };
  } catch (error) {
    return { status: PermissionStatus.Denied, error };
  }
};

export const camera = { requestPermission };
