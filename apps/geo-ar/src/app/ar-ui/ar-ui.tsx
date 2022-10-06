import { useSelector } from 'react-redux'
import { GeoDebug } from '@virtual-time-travel/geo'
import styled from 'styled-components'
// import { selectCanAr } from '../state/device.slice'
import { selectOrientation, selectPosition } from '../../store/geo.slice'
import Povs from '../povs/povs'


/* eslint-disable-next-line */
export interface ArUiProps { }

const StyledArUi = styled.div`
position: relative;
`

export function ArUi(props: ArUiProps) {

  const position = useSelector(selectPosition)
  const orientation = useSelector(selectOrientation)


  // const canAr = useSelector(selectCanAr)

  return (
    <StyledArUi>

      <GeoDebug {...{ position, orientation }} />
      <Povs />
    </StyledArUi>
  )
}

export default ArUi




// function getAngle() {
//   const p1 = {
//     x: center[0],
//     y: center[1],
//   };

//   const p2 = {
//     x: poi[0],
//     y: poi[1],
//   };

//   // angle in radians
//   return Math.atan2(p2.y - p1.y, p2.x - p1.x);

//   // angle in degrees
//   // return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
// }

// function getNormalizedCords({
//   radius,
//   angle,
// }: {
//   radius: number;
//   angle: number;
// }) {
//   const x = radius * Math.cos(angle);
//   const y = radius * Math.sin(angle);
//   return [x, y];
// }

