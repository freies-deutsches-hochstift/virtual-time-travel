import { useSelector } from "react-redux";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { Dialog } from "@virtual-time-travel/ui";
import { useDialogByKey } from "../../../hooks/use-dialog-by-key";
import { selectIsInGeoFence } from "../../../store/geo.slice";

export function ArFence() {
  const isInGeofence = useSelector(selectIsInGeoFence);
  const outOfGeofenceDialog = useDialogByKey(DialogsContentsIds.OutOfGeoFence);
  return <> {!isInGeofence && <Dialog {...outOfGeofenceDialog} />}</>;
}

export default ArFence;
