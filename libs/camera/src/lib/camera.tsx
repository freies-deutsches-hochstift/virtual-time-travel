import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WithDevicePermissionDialog } from "@virtual-time-travel/ui";
import { IS_IOS } from "@virtual-time-travel/util-device";
import { CameraStream } from "./camera-stream/camera-stream";
import { QrReader } from "./qr-reader/qr-reader";
import {
  camera,
  CameraProps,
  CameraResponsePermission,
  MediaDeviceRes,
  RequestConstraintsOptions,
} from "./utils";

export const Camera = memo((props: CameraProps) => {
  const {
    onRequestCameraComplete,
    requestCameraDialog,
    devicePermissionsStatus,
    onDecodeQr,
  } = props;

  const [device, setDevice] = useState<MediaDeviceRes | null>(null);
  const isQrReader = useMemo(() => !!onDecodeQr, [onDecodeQr]);
  const ref = useRef<HTMLDivElement>(null);

  const [captureOptions, setCaptureOptions] =
    useState<RequestConstraintsOptions>();

  const setResponse = (res: CameraResponsePermission) => {
    const { device } = res;
    if (!device?.stream) return;
    setDevice(device);
  };

  const requestStream = useCallback(async () => {
    if (!captureOptions) return;
    const res = await camera.requestPermission(captureOptions);
    const { status, error } = res;
    setResponse(res);
    if (onRequestCameraComplete)
      onRequestCameraComplete({ status, error: JSON.stringify(error) });
  }, [captureOptions, onRequestCameraComplete]);

  useEffect(() => {
    /**
     * because we can not block device rotation (app not native)
     * we fix portrait and aspect ratio from the first render
     * this is mostly necessary for qr-reader box interpolation
     */

    if (!ref.current) return;
    const [width, height] = [ref.current.offsetWidth, ref.current.offsetHeight];

    const fixedWidth = width > height ? height : width;
    const fixedHeight = width > height ? width : height;

    /**
     * boundingBox is necessary only in ios in case of updated camera permissions
     */
    const boundingBox = IS_IOS && { width: fixedWidth, height: fixedHeight };

    /**
     * because we can not block device rotation (app not native)
     * we fix portrait and aspect ratio from the first render
     * this is mostly necessary for qr-reader box interpolation
     */

    setCaptureOptions({
      audio: false,
      video: {
        facingMode: "environment",
        ...boundingBox,
        aspectRatio: fixedHeight / fixedWidth,
      },
    });
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
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
    </div>
  );
});
