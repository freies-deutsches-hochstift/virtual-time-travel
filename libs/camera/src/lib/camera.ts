import { DeviceResponsePermission, PermissionStatus } from '@virtual-time-travel/util-device';

export interface CaptureOptions {
  audio: boolean;
  video: { facingMode: string };
}

export interface CameraResponsePermission extends DeviceResponsePermission {
  status: PermissionStatus;
  stream: MediaStream | null;
  error: unknown;
}

const defaultOptions: CaptureOptions = {
  audio: false,
  video: { facingMode: 'environment' },
};

export const requestPermission = async (options = defaultOptions): Promise<CameraResponsePermission> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    return { status: PermissionStatus.Granted, stream, error: null };
  } catch (error) {
    return { status: PermissionStatus.Denied, stream: null, error };
  }
};

export const camera = { requestPermission };
