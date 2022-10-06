
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { WithDevicePermissions } from '@virtual-time-travel/ui'
import tw from "twin.macro"
import { selectHasArPermissions, selectHasCameraPermission } from '../state/device.slice'
import { selectCurrentLocale } from '../state/locales.slice'
import ArCamera from './camera'
import ArGeo from './geo'

const StyledAr = styled.div(tw`
  w-full h-full
`)

export function Ar() {
  const locale = useSelector(selectCurrentLocale)
  const hasAllPermissions = useSelector(selectHasArPermissions)
  /*
   * camera nad geo have separated custom request permission dialogs
   * and we want to display them one at the time
   */
  const hasCameraPermission = useSelector(selectHasCameraPermission)

  return (
    <WithDevicePermissions {...{ hasAllPermissions, permissionsFeedContentId: 'missing-ar-permissions', locale }}>
      <StyledAr>
        {hasCameraPermission && <ArGeo />}
        <ArCamera />
      </StyledAr>
    </WithDevicePermissions>
  )
}

export default Ar
