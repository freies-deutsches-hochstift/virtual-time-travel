import { useSelector } from "react-redux";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { Fence } from "@virtual-time-travel/geo";
import { Dialog } from "@virtual-time-travel/ui";
import { useDialogByKey } from "../../../hooks/use-dialog-by-key";
import { selectCurrentGeoFence } from "../../../store/geo.slice";

export function ArFence() {
  const currentGeoFence = useSelector(selectCurrentGeoFence);
  const outOfGeofenceDialog = useDialogByKey(DialogsContentsIds.OutOfGeoFence);

  if (!currentGeoFence?.fence) return <Dialog {...outOfGeofenceDialog} />;

  return <Fence {...{ fenceTitle: currentGeoFence?.fence.title }} />;
}

export default ArFence;
