/*
 * Wrapper component to display user feedbacks in case a mandatory api
 * is rejected or is not avail
 */

import { ReactNode } from "react"
import Dialog from "../dialog/dialog"


export interface WithDevicePermissionsProps {
  hasAllPermissions: boolean
  permissionsFeedContentId: string
  locale: string
  children: ReactNode
}


export function WithDevicePermissions({ hasAllPermissions, permissionsFeedContentId, locale, children }: WithDevicePermissionsProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (hasAllPermissions) return <>{children}</>
  return <Dialog {...{ contentId: permissionsFeedContentId, locale }} />
}