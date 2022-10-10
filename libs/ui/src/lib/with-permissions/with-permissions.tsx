/*
 * Wrapper component to display user feedbacks in case a mandatory api
 * is rejected or is not avail
 */

import { ReactNode } from "react"
import Dialog from "../dialog/dialog"


export interface WithDevicePermissionsProps {
  hasAllPermissions: boolean
  dialogContentUrl: string
  children: ReactNode
}

export function WithDevicePermissions({ hasAllPermissions, dialogContentUrl, children }: WithDevicePermissionsProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (hasAllPermissions) return <>{children}</>
  return <Dialog {...{ contentUrl: dialogContentUrl }} />
}