/*
 * Wrapper component to display user feedbacks in case a mandatory api
 * is rejected or is not avail
 */

import { PropsWithChildren } from "react";
import Dialog, { DialogProps } from "../dialog/dialog";

export interface WithDevicePermissionsProps extends PropsWithChildren {
  hasAllPermissions: boolean;
  dialog: DialogProps;
  onConfirm: () => void;
}

export function WithDevicePermissions({
  hasAllPermissions,
  dialog,
  children,
  onConfirm,
}: WithDevicePermissionsProps) {
  return (
    <>
      {hasAllPermissions && children}
      <Dialog {...{ ...dialog, show: !hasAllPermissions, onConfirm }} />
    </>
  );
}
