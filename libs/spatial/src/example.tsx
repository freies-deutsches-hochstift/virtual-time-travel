/* eslint-disable jsx-a11y/accessible-emoji */ // rule is depreciated https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/bbae2c46ab4ae94122be6c898f2ef313c6154c27/docs/rules/accessible-emoji.md
import { useSpatial } from './lib/spatial';
import styles from './example.module.scss';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface SpatialExampleProps {}

export function SpatialExample(props: SpatialExampleProps) {
  const spatial = useSpatial();

  return (
    <>
      <h1>Spatial Geo-Location Library Demo Page</h1>
      <fieldset>
        <legend>Device Orientation</legend>
        <div>State : {spatial.orientation.state}</div>
        {spatial.orientation.state === 'unavailable' ? (
          <div>😭 Device Orientation not available on this device</div>
        ) : (
          <div>🥰 Device Orientation should be available on this device</div>
        )}
        {spatial.orientation.state === 'unknown' && (
          <button onClick={() => spatial.orientation.request()}>
            Request Permission
          </button>
        )}
        <div id="myDiv"></div>
      </fieldset>
      <fieldset>
        <legend>Geolocation</legend>
      </fieldset>
    </>
  );
}

export default SpatialExample;
