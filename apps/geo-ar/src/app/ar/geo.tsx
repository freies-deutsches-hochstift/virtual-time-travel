import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { MainRoutes } from "@virtual-time-travel/app-router";
import { Geo } from "@virtual-time-travel/geo";
import {
  DeviceLocationEventRes,
  DeviceOrientationEventRes,
} from "@virtual-time-travel/geo-types";
import { WithDevicePermissions } from "@virtual-time-travel/ui";
import {
  DeviceFeatures,
  DeviceResponsePermission,
} from "@virtual-time-travel/util-device";
import ArUi from "../ar-ui/ar-ui";
import { useDialogByKey } from "../hooks/use-dialog-by-key";
import { useGotoRoute } from "../hooks/use-goto-route";
import {
  deviceActions,
  selectGeoPermissions,
  selectHasArPermissions,
} from "../store/device.slice";
import { geoActions } from "../store/geo.slice";
import ArTutorial from "./tutorial";

export function ArGeo() {
  const { goToRoute: goToMenu } = useGotoRoute(MainRoutes.Menu);
  const hasAllPermissions = useSelector(selectHasArPermissions);
  const arUnavailableDialog = useDialogByKey(DialogsContentsIds.ArUnavailable);

  const requestGeoDialog = useDialogByKey(
    DialogsContentsIds.RequestGeolocation,
  );

  const devicePermissionsStatus = useSelector(selectGeoPermissions);

  const dispatch = useDispatch<Dispatch>();

  /**
   * always wrap props functions into useCallbacks to avoid useless re-renders
   */

  const onRequestGeolocationComplete = useCallback(
    (res: DeviceResponsePermission) => {
      dispatch(
        deviceActions.handlePermissionEvent({
          permission: DeviceFeatures.Geolocation,
          ...res,
        }),
      );
    },
    [dispatch],
  );

  const onRequestOrientationComplete = useCallback(
    (res: DeviceResponsePermission) => {
      dispatch(
        deviceActions.handlePermissionEvent({
          permission: DeviceFeatures.Orientation,
          ...res,
        }),
      );
    },
    [dispatch],
  );

  const onChangePosition = useCallback(
    (position: DeviceLocationEventRes) => {
      if (position?.coordinates) dispatch(geoActions.updateLocation(position));
    },
    [dispatch],
  );

  const onChangeOrientation = useCallback(
    (event: DeviceOrientationEventRes) => {
      dispatch(geoActions.updateOrientation(event));
    },
    [dispatch],
  );

  return (
    <WithDevicePermissions
      {...{
        hasAllPermissions,
        dialog: arUnavailableDialog,
        onConfirm: goToMenu,
      }}
    >
      <ArTutorial />
      <Geo
        {...{
          onChangePosition,
          onRequestGeolocationComplete,
          onChangeOrientation,
          onRequestOrientationComplete,
          requestGeoDialog,
          devicePermissionsStatus,
        }}
      >
        <ArUi />
      </Geo>
    </WithDevicePermissions>
  );
}

export default ArGeo;
