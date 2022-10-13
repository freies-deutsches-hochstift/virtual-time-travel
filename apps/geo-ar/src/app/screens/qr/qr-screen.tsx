
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { SetInvalidQr, useQrData } from '@virtual-time-travel/app-router'
import { Dialog } from '@virtual-time-travel/ui'
import tw from 'twin.macro'
import Camera from '../../camera/camera'
import { selectDialogsContentUrls } from '../../store/config.slice'
import { selectCurrentPov } from '../../store/povs.slice'

export function QrScreen() {
  const dialogsContentUrl = useSelector(selectDialogsContentUrls)
  const currentPov = useSelector(selectCurrentPov)

  const [invalidQr, setInvalidQr] = useState(false)
  const invalidQrContentDialog = useMemo(
    () => dialogsContentUrl[DialogsContentsIds.InvalidQr],
    [dialogsContentUrl]
  )

  const onInvalidQr = useCallback((isValid) => {
    setInvalidQr(isValid)
  }, []) as SetInvalidQr

  const { onDecodeQr, onResetQrReader } = useQrData(onInvalidQr)


  useEffect(() => {
    if (!currentPov) onResetQrReader()
  }, [currentPov, onResetQrReader])


  return (
    <StyledQr>
      {invalidQr && <Dialog contentUrl={invalidQrContentDialog} onConfirm={onResetQrReader} />}
      <Camera {...{ onDecodeQr: onDecodeQr }} />
    </StyledQr>
  )
}


const StyledQr = styled.div(tw`
  w-full h-full
`)

export default QrScreen
