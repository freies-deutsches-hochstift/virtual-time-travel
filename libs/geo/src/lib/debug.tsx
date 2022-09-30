/* eslint-disable jsx-a11y/accessible-emoji */ // rule is depreciated https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/bbae2c46ab4ae94122be6c898f2ef313c6154c27/docs/rules/accessible-emoji.md

import styled from 'styled-components'
import { StateOrientation, StatePosition } from './utils'

const StyledDebug = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  padding: 1em;
  background: rgba(255,255,255, .5);
  z-index: 999;
`

export interface GeoDebugProps {
  position: StatePosition,
  orientation: StateOrientation
}

export function GeoDebug(props: GeoDebugProps) {

  const { position, orientation } = props


  return (
    <StyledDebug>

      <h3>Position:</h3>
      <table>
        <tbody>
          <tr>
            <td>↕️</td>
            <td>Latitude</td>
            <td>
              {position?.coords?.[0]}
            </td>
          </tr>
          <tr>
            <td>↔️</td>
            <td>Longitude</td>
            <td>
              {position?.coords?.[1]}
            </td>
          </tr>
          <tr>
            <td>📐</td>
            <td>Accuracy</td>
            <td>
              {position?.accuracy}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Orientation</h3>
      <table>
        <tbody>
          <tr>
            <td>α</td>
            <td>Alpha</td>
            <td>{orientation?.alpha}</td>
          </tr>
          <tr>
            <td>β</td>
            <td>Beta</td>
            <td>{orientation?.beta}</td>
          </tr>
          <tr>
            <td>γ</td>
            <td>Gamma</td>
            <td>{orientation?.gamma}</td>
          </tr>
          {/* <tr>
                <td>📐</td>
                <td>Compass Accuracy</td>
                <td>{spatial?.orientation?.compassAccuracy?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>🧭</td>
                <td>Compass Heading</td>
                <td>{spatial?.orientation?.compassHeading?.toFixed(2)}</td>
              </tr> */}
        </tbody>
      </table>
    </StyledDebug>
  )
}


export default GeoDebug
