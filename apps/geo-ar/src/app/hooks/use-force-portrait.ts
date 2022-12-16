import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { MainRoutes } from "@virtual-time-travel/app-router";
import useResizeObserver from "use-resize-observer";
import { selectAllRoutes } from "../store/router";
import { useDialogByKey } from "./use-dialog-by-key";

const forceLandscapeRoutes = [MainRoutes.Qr, MainRoutes.Explore];

export const useForcePortrait = () => {
  const { ref, height, width } = useResizeObserver();
  const routes = useSelector(selectAllRoutes);

  const forcePortraitDialog = useDialogByKey(DialogsContentsIds.ForcePortrait);

  const location = useLocation();
  const { pathname } = location;

  const forcePortrait = useMemo(() => {
    const isPortraitOnlyRoutes = !!routes
      .filter((r) => forceLandscapeRoutes.find((rr) => rr === r.routeKey))
      .map((r) => r.path)
      .find((r) => r === pathname);

    if (!isPortraitOnlyRoutes) return false;
    return !!width && !!height ? width > height : false;
  }, [width, height, pathname, routes]);

  return { ref, forcePortrait, forcePortraitDialog };
};

export default useForcePortrait;
