/**
 * A wrapper for DeviceOrientationEvent handling feature availability and permissions gracefully
 */

/**
 * Possible permission states
 */
type PermissionState = 'unknown' | 'denied' | 'granted';
/**
 * Extend native Web API DeviceOrientationEvent event for iOS devices
 * https://stackoverflow.com/questions/60640018/devicemotionevent-request-permission-with-typescript
 */
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export class DeviceOrientation {
  #permissionState: PermissionState;

  constructor() {
    this.#permissionState = 'unknown';
  }

  request() {
    console.log('typeof DeviceOrientationEvent', typeof DeviceOrientationEvent);
    const orientationAvailable = typeof DeviceOrientationEvent !== 'undefined';
    console.log('orientationAvailable', orientationAvailable);
    if (orientationAvailable) {
      const requestPermission = (
        DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
      ).requestPermission;
      const iOS = typeof requestPermission === 'function';
      //iOS 13+
      if (iOS) {
        requestPermission()
          .then((permissionState: PermissionState) => {
            console.log(`permissionState ${permissionState}`);
            if (permissionState === 'granted') {
              this.#permissionState = 'granted';
              window.addEventListener('deviceorientation', (data) => {
                // TODO Split off addEventListener to bind function to be called after requesting
                console.log(data);
              });
            } else if (permissionState === 'denied') {
              this.#permissionState = 'denied';
            }
          })
          .catch(console.error);
      } else {
        // TODO Add support for Android
        // TODO Check if we need to / can support iOS below 13
        console.warn('Oh no im not iOS13+!');
        // DeviceMotionEvent.initDeviceMotionEvent().then((e) => console.log(e));
        // handle regular non iOS 13+ devices
      }
    } else {
      console.warn('DeviceOrientationEvent not available on this device!');
    }
  }
}
