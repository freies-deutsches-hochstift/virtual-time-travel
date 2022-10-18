export {};

declare global {
  interface Window {
    ondeviceorientationabsolute: DeviceOrientationEvent;
  }
}
