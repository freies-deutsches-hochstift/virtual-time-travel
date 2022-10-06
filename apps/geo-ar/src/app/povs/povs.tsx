/**
 * TODO !!!!!! clean this up
 * this is just a proof of concept !!!!
 */



import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { CurrentPov, selectCurrentGeoFence, selectOrientation } from '../../store/geo.slice'

/* eslint-disable-next-line */
export interface PovsProps { }

/* eslint-disable-next-line */
export interface PovProps {
  pov: CurrentPov
}

const StyledPovs = styled.div`
position: absolute;
top: 33vh;
left: 0;
width: 100%;
height: 20vh;
overflow: hidden;
z-index: 9999;
display: flex;

`
const StyledPov = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: pink;
  position: absolute;
  top: 0;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledArFence = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(255,255,255, .5);
  padding: .5em;
`


const crfWidth = 10800
const sectorWidth = crfWidth / 3
const factor = 10


export function Povs(props: PovsProps) {

  const currentGeoFence = useSelector(selectCurrentGeoFence)
  const orientation = useSelector(selectOrientation)
  const { fence, povs } = currentGeoFence || {}

  const { compassHeading } = orientation || {}

  const centerStartPosition = -sectorWidth + (0.5 * window.innerWidth)

  const compassPosition = useMemo(() => centerStartPosition - ((compassHeading || 0) * factor), [centerStartPosition, compassHeading])

  return (
    <>
      {fence && <StyledArFence>{fence.title}</StyledArFence>}

      <StyledPovs>
        <div style={{ width: crfWidth, position: 'absolute', top: 0, left: 0, display: 'flex', transform: `translateX(${compassPosition}px)` }}>
          <div style={{ width: sectorWidth, border: '2px solid purple', position: 'relative' }}>
            {povs?.map(pov => <Pov key={pov.id} {...{ pov }} />)}
          </div>
          <div style={{ width: sectorWidth, border: '2px solid green', position: 'relative' }}>
            {povs?.map(pov => <Pov key={pov.id} {...{ pov }} />)}
          </div>
          <div style={{ width: sectorWidth, border: '2px solid yellow', position: 'relative' }}>
            {povs?.map(pov => <Pov key={pov.id} {...{ pov }} />)}
          </div>
        </div>
      </StyledPovs>

    </>

  )
}


function Pov(props: PovProps) {
  const { pov } = props
  const { id, bearingDistance, distance } = pov
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!bearingDistance) return <></>

  return (
    <StyledPov style={{ left: `${bearingDistance * factor}px` }}>
      <p>{id}</p>
      <p>{distance}</p>
    </StyledPov>
  )
}

export default Povs




