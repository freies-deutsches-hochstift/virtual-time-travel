/*
 * Wrapper component to display explanation dialog
 * before to request device permission
 * this is user friendly but also allows us to connect the 
 * permission request to the user interaction (to avoid browser security policy)
 */

import { ReactNode } from "react"
import { PermissionStatus } from "@virtual-time-travel/util-device"
import Dialog from "../dialog/dialog"


export interface WithDevicePermissionDialogProps {
  onConfirm: (event: unknown) => unknown,
  onCancel?: (event: unknown) => unknown
  dialogContentId: string
  locale: string
  devicePermissionsStatus: Array<PermissionStatus>
  children?: ReactNode
}


export function WithDevicePermissionDialog({ onConfirm, onCancel, dialogContentId, locale, devicePermissionsStatus, children }: WithDevicePermissionDialogProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (devicePermissionsStatus.find(s => s !== PermissionStatus.Unknown)) return <>{children}</>

  return <Dialog {...{ onCancel, onConfirm, locale, contentId: dialogContentId }} />
}