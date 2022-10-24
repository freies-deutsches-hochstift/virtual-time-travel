/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback, useState } from "react";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { Dialog } from "@virtual-time-travel/ui";
import { useDialogByKey } from "../hooks/use-dialog-by-key";

export function ArTutorial() {
  const [showTutorial, setShowTutorial] = useState<boolean>(getDefaultState());
  const arTutorialDialog = useDialogByKey(DialogsContentsIds.ArTutorial);

  const onClose = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem("ar-tutorial", "false");
  }, []);

  return (
    <>
      {showTutorial && (
        <Dialog {...arTutorialDialog} onClose={onClose} onConfirm={onClose} />
      )}
    </>
  );
}

export default ArTutorial;

function getDefaultState() {
  const lsEntry = localStorage.getItem("ar-tutorial");
  if (!lsEntry) return true;
  return JSON.parse(lsEntry);
}
