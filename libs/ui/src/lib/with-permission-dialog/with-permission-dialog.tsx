/*
 * Wrapper component to display explanation dialog
 * before to request device permission
 * this is user friendly but also allows us to connect the
 * permission request to the user interaction (to avoid browser security policy)
 */

import { ReactNode, useEffect, useState } from 'react'
import { PermissionStatus } from '@virtual-time-travel/util-device'
import Dialog from '../dialog/dialog'

export interface WithDevicePermissionDialogProps {
  onConfirm: (event?: unknown) => unknown
  onCancel?: (event?: unknown) => unknown
  dialogContentUrl: string
  onConfirmLabel?: string
  onCancelLabel?: string
  devicePermissionsStatus: Array<PermissionStatus>
  children?: ReactNode
}

export function WithDevicePermissionDialog({
  onConfirm,
  onCancel,
  dialogContentUrl,
  devicePermissionsStatus,
  onConfirmLabel,
  onCancelLabel,
  children,
}: WithDevicePermissionDialogProps) {
  const [hasAlreadyPermissions] = useState(
    devicePermissionsStatus.filter((s) => s === PermissionStatus.Granted)
      .length === devicePermissionsStatus.length
  )

  useEffect(() => {
    if (hasAlreadyPermissions) onConfirm()
  }, [hasAlreadyPermissions, onConfirm])

  if (
    devicePermissionsStatus.find((s) => s !== PermissionStatus.Unknown) ||
    hasAlreadyPermissions
  )
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>

  return <Dialog {...{
    onCancel, onConfirm, contentUrl: dialogContentUrl, onConfirmLabel,
    onCancelLabel,
  }} />
}
