// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss'
import { locationGeo } from '@virtual-time-travel/location-geo'
import { locationQr } from '@virtual-time-travel/location-qr'
import { locationOrientation } from '@virtual-time-travel/location-orientation'

export function App() {
  return (
    <>
      <h1>
        Welcome geo-ar{' '}
        <span role="img" aria-label="Thumb-up">
          👍
        </span>
      </h1>
      <div className="import">Imported Libs from local workspace:</div>
      <ul>
        <li className="lib">{locationGeo()}</li>
        <li className="lib">{locationQr()}</li>
        <li className="lib">{locationOrientation()}</li>
      </ul>
    </>
  );
}

export default App;
