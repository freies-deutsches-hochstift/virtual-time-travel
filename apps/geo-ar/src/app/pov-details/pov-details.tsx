/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { getHashSearchParams } from '../hooks/useQrData'
import { povsActions, selectCurrentPov } from '../store/povs.slice'


/* eslint-disable-next-line */
export interface PovDetailsProps { }

const StyledPovDetails = styled.div`
  color: pink;
`

export function PovDetails(props: PovDetailsProps) {

  const location = useLocation()
  const pov = useSelector(selectCurrentPov)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(pov)
  }, [pov])


  useEffect(() => {
    const { search } = location
    const { povId } = getHashSearchParams(search)

    dispatch(povsActions.setCurrentId(povId as string))

  }, [location, dispatch])

  if (!pov) return <></>

  return (
    <StyledPovDetails>
      {pov.id}
    </StyledPovDetails>
  )
}

export default PovDetails
