import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { Button, Dialog, Icon, Icons } from "@virtual-time-travel/ui";
import { useDialogByKey } from "../../../hooks/use-dialog-by-key";
import { selectClosestPov } from "../../../store/geo.slice";

export function ArTutorial() {
  const [showTutorial, setShowTutorial] = useState<boolean>(getDefaultState());
  const arTutorialDialog = useDialogByKey(DialogsContentsIds.ArTutorial);
  const closestInViewPov = useSelector(selectClosestPov);

  const onClose = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem("ar-tutorial", "false");
  }, []);

  const reShowTutorial = useCallback(() => {
    setShowTutorial(true);
  }, []);

  return (
    <>
      {!closestInViewPov && !showTutorial && (
        <div className="absolute bottom-4 right-4 z-max">
          <Button onlyIcon onClick={reShowTutorial}>
            <Icon type={Icons.Info} />
          </Button>
        </div>
      )}
      <Dialog
        {...{
          ...arTutorialDialog,
          show: showTutorial,
          skippable: true,
          onClose,
          onConfirm: onClose,
        }}
      />
    </>
  );
}

export default ArTutorial;

function getDefaultState() {
  const lsEntry = localStorage.getItem("ar-tutorial");
  if (!lsEntry) return true;
  return JSON.parse(lsEntry);
}
