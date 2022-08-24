// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss'
import { locationGeo } from '@virtual-time-travel/location-geo'

export function App() {
  return (
    <>
      <h1>
        Welcome geo-ar{' '}
        <span role="img" aria-label="Thumb-up">
          👍
        </span>
      </h1>
      <div className="geo">{locationGeo()}</div>
    </>
  );
}

export default App;
