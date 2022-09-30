import { Link } from 'react-router-dom'
import styles from './examples.module.scss'

/* eslint-disable-next-line */
export interface ExamplesProps { }

export function Examples(props: ExamplesProps) {

  return (
    <div className={styles['container']}>

      <h1>
        Welcome geo-ar
        <span role="img" aria-label="Thumb-up">
          👍
        </span>
      </h1>
      <div className="import">Imported Libs from local workspace:</div>
      <ul>
        <li className="lib">
          <Link to="/examples-camera">Camera Library</Link>
        </li>
        <li className="lib">
          <Link to="/examples-api">API Library</Link>
        </li>
        <li className="lib">
          <Link to="/examples-db">Database Library</Link>
        </li>
        <li className="lib">
          <Link to="/examples-spatial">Spatial Geolocation Library</Link>
        </li>
        <li className="lib">
          <Link to="/examples-cvstojson">CSV to JSON Library</Link>
        </li>
      </ul>

      <div className="redux">Redux slices (@see redux dev tool):</div>
      <ul>
        <li className="slice">general</li>
        <li className="slice">geo</li>
      </ul>


    </div>
  )
}

export default Examples
