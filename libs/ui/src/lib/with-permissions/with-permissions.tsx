/*
 * Wrapper component to display user feedbacks in case a mandatory api
 * is rejected or is not avail
 */

import { ReactNode } from "react";
import Dialog, { DialogProps } from "../dialog/dialog";

export interface WithDevicePermissionsProps {
  hasAllPermissions: boolean;
  dialog: DialogProps;
  children: ReactNode;
}

export function WithDevicePermissions({
  hasAllPermissions,
  dialog,
  children,
}: WithDevicePermissionsProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (hasAllPermissions) return <>{children}</>;
  return <Dialog {...dialog} />;
}
