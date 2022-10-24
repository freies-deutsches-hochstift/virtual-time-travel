import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { SetInvalidQr, useQrData } from "@virtual-time-travel/app-router";
import { Dialog } from "@virtual-time-travel/ui";
import tw from "twin.macro";
import Camera from "../../camera/camera";
import { useDialogByKey } from "../../hooks/use-dialog-by-key";
import { selectCurrentPov } from "../../store/povs.slice";
import { selectQrRoute } from "../../store/router";
import { RouteAnimation } from "../route-animation";

export function QrRoute() {
  const currentPov = useSelector(selectCurrentPov);
  const qrRoute = useSelector(selectQrRoute);

  const [invalidQr, setInvalidQr] = useState(false);
  const invalidQrContentDialog = useDialogByKey(DialogsContentsIds.InvalidQr);

  const onInvalidQr = useCallback((isValid) => {
    setInvalidQr(isValid);
  }, []) as SetInvalidQr;

  const { onDecodeQr, onResetQrReader } = useQrData(onInvalidQr, qrRoute);

  useEffect(() => {
    if (!currentPov) onResetQrReader();
  }, [currentPov, onResetQrReader]);

  return (
    <RouteAnimation>
      <StyledQr>
        {invalidQr && (
          <Dialog {...invalidQrContentDialog} onConfirm={onResetQrReader} />
        )}
        <Camera {...{ onDecodeQr: onDecodeQr }} />
      </StyledQr>
    </RouteAnimation>
  );
}

const StyledQr = styled.div(tw`
  w-full h-full
`);

export default QrRoute;
