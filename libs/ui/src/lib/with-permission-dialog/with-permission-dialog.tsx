/*
 * Wrapper component to display explanation dialog
 * before to request device permission
 * this is user friendly but also allows us to connect the
 * permission request to the user interaction (to avoid browser security policy)
 */

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { PermissionStatus } from "@virtual-time-travel/util-device";
import Dialog, { DialogProps } from "../dialog/dialog";

export interface WithDevicePermissionDialogProps extends PropsWithChildren {
  onConfirm: (event?: unknown) => unknown;
  onCancel?: (event?: unknown) => unknown;
  dialog: DialogProps;
  devicePermissionsStatus: Array<PermissionStatus>;
}

export function WithDevicePermissionDialog({
  onConfirm,
  onCancel,
  dialog,
  devicePermissionsStatus,
  children,
}: WithDevicePermissionDialogProps) {
  const [hasAlreadyPermissions] = useState(
    devicePermissionsStatus.filter((s) => s === PermissionStatus.Granted)
      .length === devicePermissionsStatus.length,
  );

  const ready = useMemo(
    () =>
      devicePermissionsStatus.find((s) => s !== PermissionStatus.Unknown) ||
      hasAlreadyPermissions,
    [devicePermissionsStatus, hasAlreadyPermissions],
  );

  useEffect(() => {
    if (hasAlreadyPermissions) onConfirm();
  }, [hasAlreadyPermissions, onConfirm]);

  return (
    <>
      {ready && children}
      <Dialog
        {...{
          onCancel,
          onConfirm,
          disabledAfterClick: true,
          show: !ready,
          ...dialog,
        }}
      />
    </>
  );
}
