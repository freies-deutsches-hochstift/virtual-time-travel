/* eslint-disable jsx-a11y/accessible-emoji */ // rule is depreciated https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/bbae2c46ab4ae94122be6c898f2ef313c6154c27/docs/rules/accessible-emoji.md
import { useSpatial } from './lib/spatial';
import styles from './example.module.scss';

/* eslint-disable-next-line */
export interface SpatialExampleProps {}

export function SpatialExample(props: SpatialExampleProps) {
  const spatial = useSpatial();

  return (
    <>
      <h1>Spatial Geo-Location Library Demo Page</h1>
      <fieldset>
        <legend>Device Orientation</legend>
        {spatial.orientation.state === 'unavailable' ? (
          <div>😭 Not available</div>
        ) : (
          <div>🥰 Should be available</div>
        )}

        <div>State : {spatial.orientation.state}</div>
        {spatial.orientation.state === 'unknown' && (
          <button onClick={() => spatial.orientation.request()}>
            Request Permission
          </button>
        )}

        {spatial.orientation.state === 'granted' && (
          <table>
            <thead>
              <tr>
                <td>⏰</td>
                <td>Timestamp</td>
                <td>{spatial?.orientation?.rawData?.timeStamp?.toFixed(2)}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>α</td>
                <td>Alpha</td>
                <td>{spatial?.orientation?.rawData?.alpha?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>β</td>
                <td>Beta</td>
                <td>{spatial?.orientation?.rawData?.beta?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>γ</td>
                <td>Gamma</td>
                <td>{spatial?.orientation?.rawData?.gamma?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>📐</td>
                <td>Compass Accuracy</td>
                <td>{spatial?.orientation?.compassAccuracy?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>🧭</td>
                <td>Compass Heading</td>
                <td>{spatial?.orientation?.compassHeading?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </fieldset>
      <fieldset>
        <legend>Geolocation</legend>
        {spatial.location.state === 'unavailable' ? (
          <div>😭 Not available</div>
        ) : (
          <div>🥰 Should be available</div>
        )}

        <div>State : {spatial.location.state}</div>
        {spatial.location.state === 'unknown' && (
          <button onClick={() => spatial.location.request()}>
            Request Permission
          </button>
        )}

        {spatial.location.state === 'granted' && (
          <table>
            <thead>
              <tr>
                <td>⏰</td>
                <td>Timestamp</td>
                <td>
                  {spatial?.location?.geolocationPosition?.timestamp?.toFixed(
                    2
                  )}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>↕️</td>
                <td>Latitude</td>
                <td>
                  {spatial?.location?.geolocationPosition?.coords?.latitude?.toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <td>↔️</td>
                <td>Longitude</td>
                <td>
                  {spatial?.location?.geolocationPosition?.coords?.longitude?.toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <td>📐</td>
                <td>Accuracy</td>
                <td>
                  {spatial?.location?.geolocationPosition?.coords?.accuracy?.toFixed(
                    2
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </fieldset>
      <br />
      <div>
        Note : Most devices want you to request hardware access via a user
        event, like onClick. If permission has been granted before you can skip
        this, but there is also no way to check easily. You could save the state
        to localStore, but it could have changed.
      </div>
    </>
  );
}

export default SpatialExample;
