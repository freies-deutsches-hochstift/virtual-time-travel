import { GeoDebug } from '@virtual-time-travel/geo'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
// import { selectCanAr } from '../state/device.slice'
import { selectOrientation, selectPosition } from '../state/geo.slice'

/* eslint-disable-next-line */
export interface ArUiProps { }

const StyledArUi = styled.div``

export function ArUi(props: ArUiProps) {

  const position = useSelector(selectPosition)
  const orientation = useSelector(selectOrientation)
  // const canAr = useSelector(selectCanAr)

  return (
    <StyledArUi>
      <GeoDebug {...{ position, orientation }} />
    </StyledArUi>
  )
}

export default ArUi