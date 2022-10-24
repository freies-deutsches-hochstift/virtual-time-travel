import { useMemo } from "react";
import { useSelector } from "react-redux";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { RootState } from "../../main";
import { useDialog } from "../store/dialogs";

export function useDialogByKey(key: DialogsContentsIds) {
  const selectDialog = useMemo(useDialog, []);
  const dialog = useSelector((state: RootState) => selectDialog(state, key));

  return dialog;
}
