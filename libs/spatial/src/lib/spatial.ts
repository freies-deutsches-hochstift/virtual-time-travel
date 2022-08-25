import * as geolib from 'geolib';
import { DeviceOrientation } from './device-orientation';
import { Geolocation } from './geolocation';
import { GeolibGeoJSONPoint } from 'geolib/es/types';

export interface poi {
  id: number;
  coordinate: GeolibGeoJSONPoint;
}

export class Spatial {
  #someString = 'I am quite a string';
  #userPos: GeolibGeoJSONPoint;
  #deviceOrientation: DeviceOrientation;
  #geolocation: Geolocation;

  constructor() {
    this.#deviceOrientation = new DeviceOrientation();
    this.#geolocation = new Geolocation();
    this.#userPos = [0, 0];
  }

  requestOrientation() {
    this.#deviceOrientation.request();
  }

  get someString() {
    return this.#someString;
  }

  updateDistance = (target: GeolibGeoJSONPoint) => {
    return geolib.getDistance(this.#userPos, target);
  };
}
