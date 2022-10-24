import { memo, useCallback, useMemo, useState } from "react";
import { WithDevicePermissionDialog } from "@virtual-time-travel/ui";
import { CameraStream } from "./camera-stream/camera-stream";
import { QrReader } from "./qr-reader/qr-reader";
import {
  camera,
  CameraProps,
  CameraResponsePermission,
  MediaDeviceRes,
} from "./utils";

export const Camera = memo((props: CameraProps) => {
  const {
    captureOptions,
    onRequestCameraComplete,
    requestCameraDialog,
    devicePermissionsStatus,
    onDecodeQr,
  } = props;

  const [device, setDevice] = useState<MediaDeviceRes | null>(null);
  const isQrReader = useMemo(() => !!onDecodeQr, [onDecodeQr]);

  const setResponse = (res: CameraResponsePermission) => {
    const { device } = res;
    if (!device?.stream) return;
    setDevice(device);
  };

  const requestStream = useCallback(async () => {
    const res = await camera.requestPermission(captureOptions);
    const { status, error } = res;
    setResponse(res);
    if (onRequestCameraComplete)
      onRequestCameraComplete({ status, error: JSON.stringify(error) });
  }, [captureOptions, onRequestCameraComplete]);

  return (
    <WithDevicePermissionDialog
      {...{
        onConfirm: requestStream,
        devicePermissionsStatus,
        dialog: requestCameraDialog,
      }}
    >
      {!!device &&
        (isQrReader ? (
          <QrReader {...{ device, onDecodeQr }} />
        ) : (
          <CameraStream {...{ device }} />
        ))}
    </WithDevicePermissionDialog>
  );
});
