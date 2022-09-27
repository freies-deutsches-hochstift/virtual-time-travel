export enum CameraStatus {
  Unknown = 'unknown',
  Denied = 'denied',
  Granted = 'granted',
  Unavailable = 'unavailable',
}

export interface CaptureOptions {
  audio: boolean;
  video: { facingMode: string };
}
