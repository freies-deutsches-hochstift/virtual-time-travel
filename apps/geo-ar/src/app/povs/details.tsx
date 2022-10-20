/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import {
  getHashSearchParams,
  useOnClosePov,
} from '@virtual-time-travel/app-router'
import { PovCardDetails } from '@virtual-time-travel/geo'
import { EnhancedPov } from '@virtual-time-travel/geo-types'
import { Dialog } from '@virtual-time-travel/ui'
import { useDialogByKey } from '../hooks/useDialogByKey'
import { povsActions, selectCurrentPov } from '../store/povs.slice'

export function PovDetails() {
  const location = useLocation()
  const pov = useSelector(selectCurrentPov)
  const dispatch = useDispatch()

  const onClose = useOnClosePov()

  useEffect(() => {
    const { search } = location
    const { povId } = getHashSearchParams(search)

    dispatch(povsActions.setCurrentId(povId as string))
  }, [location, dispatch])

  if (!pov) return <></>

  return <PovCardDetailsWrapper {...{ pov, onClose }} />
}

interface PovCardDetailsWrapperProps {
  pov: EnhancedPov | string
  onClose: (e: unknown) => void
}

export function PovCardDetailsWrapper({ pov, onClose }: PovCardDetailsWrapperProps) {

  const povNotFoundContentDialog = useDialogByKey(DialogsContentsIds.PovNotFound)

  if (typeof pov === 'string') return <Dialog {...{ onConfirm: onClose, ...povNotFoundContentDialog }} />

  return <PovCardDetails {...{ pov, onClose }} />
}

export default PovDetails
