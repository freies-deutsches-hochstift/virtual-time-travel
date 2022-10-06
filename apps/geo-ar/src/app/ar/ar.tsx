
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { WithDevicePermissions } from '@virtual-time-travel/ui'
import tw from "twin.macro"
import { selectHasArPermissions, selectHasCameraPermission } from '../../store/device.slice'
import { selectCurrentLocale } from '../../store/locales.slice'
import ArCamera from './camera'
import ArGeo from './geo'

const StyledAr = styled.div(tw`
  w-full h-full
`)

export function Ar() {
  const locale = useSelector(selectCurrentLocale)
  const hasAllPermissions = useSelector(selectHasArPermissions)
  /*
   * camera and geo have separated custom request permission dialogs
   * and we want to display them one at the time
   */
  const hasCameraPermission = useSelector(selectHasCameraPermission)

  return (
    <WithDevicePermissions {...{ hasAllPermissions, permissionsFeedContentId: 'can-not-ar', locale }}>
      <StyledAr>
        {hasCameraPermission && <ArGeo />}
        <ArCamera />
      </StyledAr>
    </WithDevicePermissions>
  )
}

export default Ar
