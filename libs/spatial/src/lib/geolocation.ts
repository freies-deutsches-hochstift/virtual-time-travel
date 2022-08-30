/**
 * A wrapper for navigator.geolocation handling feature availability and permissions gracefully
 */

/**
 * Possible permission states
 */
type State = 'unknown' | 'denied' | 'granted';

export class Geolocation {
  #state: State;

  constructor() {
    this.#state = 'unknown';
  }

  get state() {
    return this.#state;
  }

  // TODO Split request and event binding
  request = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        // TODO Handle successCallback as event, passing data to spatial and triggering update
        (data) => {
          console.log(data);
        },
        this.#handlePositionError,
        {
          enableHighAccuracy: true,
          timeout: 10000, //Had to up this from 5s on desktop. Doesn't seem like an issue on mobile but check here if slow
          maximumAge: 0,
        }
      );
    }
  };

  #handlePositionError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case 1:
        this.#state = 'denied';
        break;
      case 2:
        console.warn(
          'Acquisition of the geolocation failed because at least one internal source of position returned an internal error.',
          error
        );
        this.#state = 'unknown';
        break;
      case 3:
        // TODO Should we warn the user if we loose GPS?
        console.warn(
          'The time allowed to acquire the geolocation was reached before the information was obtained.',
          error
        );
        break;
      default:
        console.warn('Unknown location error : ', error);
        this.#state = 'unknown';
        break;
    }
  };
}
