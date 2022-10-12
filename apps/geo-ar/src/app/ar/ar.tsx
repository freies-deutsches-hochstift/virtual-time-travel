import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { WithDevicePermissions } from '@virtual-time-travel/ui'
import tw from 'twin.macro'
import Camera from '../camera/camera'
import { selectDialogsContentUrls } from '../store/config.slice'
import {
  selectHasArPermissions,
  selectHasCameraPermission,
} from '../store/device.slice'
import ArGeo from './geo'

export function Ar() {
  const hasAllPermissions = useSelector(selectHasArPermissions)
  const dialogsContentUrl = useSelector(selectDialogsContentUrls)

  /*
   * camera and geo have separated custom request permission dialogs
   * and we want to display them one at the time
   */
  const hasCameraPermission = useSelector(selectHasCameraPermission)

  const arUnavailableDialog = useMemo(
    () => dialogsContentUrl[DialogsContentsIds.ArUnavailable],
    [dialogsContentUrl]
  )

  return (
    <StyledAr>
      {hasCameraPermission && (
        <WithDevicePermissions
          {...{ hasAllPermissions, dialogContentUrl: arUnavailableDialog }}
        >
          <ArGeo />
        </WithDevicePermissions>
      )}
      <Camera />
    </StyledAr>
  )
}

const StyledAr = styled.div(tw`
  w-full h-full
`)

export default Ar
