// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss'
import { locationGeo } from '@virtual-time-travel/location-geo'
import { locationQr } from '@virtual-time-travel/location-qr'
import { locationOrientation } from '@virtual-time-travel/location-orientation'
import { camera } from '@virtual-time-travel/camera'
import { data } from '@virtual-time-travel/data'

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
        <li className="lib">{camera()}</li>
        <li className="lib">{data()}</li>
      </ul>
      <div className="redux">Redux slices (@see redux dev tool):</div>
      <ul>
        <li className="slice">general</li>
        <li className="slice">geo</li>
      </ul>
    </>
  );
}

export default App;
