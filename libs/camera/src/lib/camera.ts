import { OnDecodeQr } from '@virtual-time-travel/app-router';
import {
  DeviceResponsePermission,
  PermissionStatus,
} from '@virtual-time-travel/util-device';

interface MediaDeviceRes {
  deviceId?: string;
  stream: MediaStream | null;
}

export interface CameraStreamProps {
  captureOptions?: MediaStreamConstraints;
  onRequestCameraComplete?: (res: DeviceResponsePermission) => void;
  requestCameraDialog: string;
  onConfirmLabel: string;
  devicePermissionsStatus: Array<PermissionStatus>;
  onDecodeQr?: OnDecodeQr;
}

export interface CameraResponsePermission extends DeviceResponsePermission {
  status: PermissionStatus;
  device?: MediaDeviceRes | null;
  error: unknown;
}

const defaultConstraints: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: 'environment' },
};

export const requestPermission = async (
  options = defaultConstraints,
  getStream?: boolean
): Promise<CameraResponsePermission> => {
  try {
    let stream = null;

    // stream is necessary only for camera-stream and it will conflict with zxing qr reader
    if (getStream) stream = await navigator.mediaDevices.getUserMedia(options);

    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceId = devices.find((d) => d.kind === 'videoinput')?.deviceId;

    return {
      status: PermissionStatus.Granted,
      device: { stream, deviceId },
      error: null,
    };
  } catch (error) {
    return { status: PermissionStatus.Denied, error };
  }
};

export const camera = { requestPermission };
