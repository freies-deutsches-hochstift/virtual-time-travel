/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getHashSearchParams, useOnClosePov } from '@virtual-time-travel/app-router'
import { PovCardDetails } from '@virtual-time-travel/ui'
import { povsActions, selectCurrentPov } from '../store/povs.slice'



export function PovDetails() {

  const location = useLocation()
  const pov = useSelector(selectCurrentPov)
  const dispatch = useDispatch()


  const onClose = useOnClosePov()

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
    <PovCardDetails {...{ pov, onClose }} />
  )
}

export default PovDetails
