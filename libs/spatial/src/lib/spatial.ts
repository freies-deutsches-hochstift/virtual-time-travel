import * as geolib from 'geolib';
import { useDeviceOrientation } from './device-orientation';
import { Geolocation } from './geolocation';
import { GeolibGeoJSONPoint } from 'geolib/es/types';
import { useState } from 'react';

export interface poi {
  id: string;
  coordinate: GeolibGeoJSONPoint;
}

export function useSpatial() {
  const [userPos, setUserPos] = useState<GeolibGeoJSONPoint | undefined>();
  const orientation = useDeviceOrientation();
  // #deviceOrientation: DeviceOrientation;
  // #geolocation: Geolocation;

  // constructor() {
  //   this.#deviceOrientation = new DeviceOrientation();
  //   this.#geolocation = new Geolocation();
  //   this.#userPos = [0, 0];
  // }

  // requestOrientation() {
  //   console.log('Doing all the things1!!1');
  //   // console.log('this.#deviceOrientation.request', this.#deviceOrientation);
  //   this.#deviceOrientation.request();
  // }

  // get orientationState() {
  //   return this.#deviceOrientation.state;
  // }

  // updateDistance = (target: GeolibGeoJSONPoint) => {
  //   return geolib.getDistance(this.#userPos, target);
  // };

  return {
    orientation,
  };
}
