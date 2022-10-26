/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { Dialog } from "@virtual-time-travel/ui";
import { useDialogByKey } from "../../../hooks/use-dialog-by-key";
import {
  selectCurrentGeoFence,
  selectOrientation,
} from "../../../store/geo.slice";

export function ArDeviceOrientationHelper() {
  const currentGeoFence = useSelector(selectCurrentGeoFence);
  const orientation = useSelector(selectOrientation);

  const canDisplayDialog = useMemo(() => !!currentGeoFence, [currentGeoFence]);
  const dialog = useDialogByKey(DialogsContentsIds.ForceOrientation);

  const showDialog = useMemo(() => {
    if (!orientation) return false;
    const { beta } = orientation;

    return !(beta > 50 && beta < 120);
  }, [orientation]);

  if (!canDisplayDialog) return <></>;
  return <>{showDialog && <Dialog {...dialog} />}</>;
}

export default ArDeviceOrientationHelper;
