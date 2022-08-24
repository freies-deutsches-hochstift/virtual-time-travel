export function camera(): string {
  return 'camera';
}

/**
 * Possible permission states
 */
type PermissionState = 'unknown' | 'denied' | 'granted';

export class Camera {
  #permissionState: PermissionState;
  #cameraConstraints: MediaStreamConstraints;

  /**
   *
   * @param constraints MediaStreamConstraints
   * Constraints placed on the media stream request for the audio and video streams.
   * Default is
   *     { audio: false, video: { facingMode: { ideal: 'environment' }}}
   */
  constructor(constraints?: MediaStreamConstraints) {
    this.#permissionState = 'unknown';
    this.#cameraConstraints = constraints ?? {
      audio: false,
      video: {
        facingMode: { ideal: 'environment' },
      },
    };
  }

  get permissionState(): PermissionState {
    return this.#permissionState;
  }

  get permissionGranted(): boolean {
    return this.#permissionState === 'granted';
  }

  /**
   * Bind the video stream to an HTML Video element.
   * Note, this needs to be called by a user interaction event
   * Otherwise some browsers will deny permission
   * If you are not ready to show the stream, hide the element
   * @param {HTMLVideoElement} element
   * @param {Function} [errorCallback] Optional, callback for custom error function
   */
  bind(element: HTMLVideoElement, errorCallback?: () => void) {
    //TODO Think about having events for granted
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(this.#cameraConstraints)
        // .then(function (stream) {
        // not 100% how scoping works here... this is shadowed by local scope if I use
        // a function declaration, but not if I use arrow. Needs testing
        .then((stream) => {
          element.srcObject = stream;
          this.#permissionState = 'granted';
        })
        .catch(errorCallback ?? this.#bindErrorCallback);
    }
  }

  #bindErrorCallback = (error: unknown) => {
    //TODO Not sure if this should be a warn or an error.
    this.#permissionState = 'denied';
    console.warn(`Failed to bind UserMedia stream to HTML Video Element`);
    console.warn(error);
  };
}
