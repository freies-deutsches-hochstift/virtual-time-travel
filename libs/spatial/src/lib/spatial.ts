import * as geolib from 'geolib';
import { useDeviceOrientation } from './device-orientation';
import { useLocation } from './location';
import { GeolibGeoJSONPoint } from 'geolib/es/types';

export interface poi {
  id: string;
  coordinate: GeolibGeoJSONPoint;
}

export function useSpatial() {
  // TODO Use Profiler to see if orientation is causing everything to rerender too often
  const orientation = useDeviceOrientation();
  const location = useLocation();

  /**
   * A shorthand to location.geolocationPosition.coords in GeoJSON format
   */

  
  const position: GeolibGeoJSONPoint | undefined = [
    location.geolocationPosition?.coords.latitude ?? 0,
    location.geolocationPosition?.coords.longitude ?? 0,
  ];

  /**
   * Calculates the Bearing Delta between the direction the user is facing and the
   * bearing to the target in degrees
   * @param  {number} startBearing Direction From
   * @param  {number} endBearing Direction To
   * @return {array} [deltaClockwise, deltaCounterClockwise] Returns an array of the deltas
   * in clockwise and counterClockwise directions in degrees(on the compass)
   */
  const bearingDelta = (startBearing: number, endBearing: number) => {
    const delta = endBearing - startBearing;
    const clockwise = endBearing - startBearing + (delta < 0 ? 360 : 0);
    const counterClockwise = endBearing - startBearing - (delta < 0 ? 0 : 360);
    return [clockwise, counterClockwise];
  };

  /**
   * Calculates the Bearing Delta between the direction the user is facing and the
   * bearing to the target in degrees and unitizes where CW rotation is positive and
   * CCW rotation is negative
   * @param  {number} startBearing Direction From
   * @param  {number} endBearing Direction To
   * @return {number} Returns a unitized value where :
   *      1  is 180 degrees CW  rotation
   *     0.5 is 90  degrees CW  rotation
   * and -1 is 180 degrees CCW rotation
   *
   */
  const bearingDeltaUnit = (startBearing: number, endBearing: number) => {
    const [clockwise, counterClockwise] = bearingDelta(
      startBearing,
      endBearing
    );
    if (clockwise <= Math.abs(counterClockwise)) {
      return clockwise / 180;
    } else {
      return counterClockwise / 180;
    }
  };

  return {
    position,
    orientation,
    location,
    getDistance: geolib.getDistance,
    isPointInPolygon: geolib.isPointInPolygon,
    bearingDelta,
    bearingDeltaUnit,
  };
}
