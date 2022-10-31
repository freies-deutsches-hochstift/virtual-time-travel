import { memo, useEffect } from "react";
import { OnDecodeQr } from "@virtual-time-travel/app-router";
import { Html5Qrcode } from "html5-qrcode";
import { MediaDeviceRes } from "../utils";

const qrcodeRegionId = "html5qr-code-full-region";

interface QrReaderProps {
  device: MediaDeviceRes;
  onDecodeQr?: OnDecodeQr;
}

export const QrReader = memo(({ device, onDecodeQr }: QrReaderProps) => {
  const { videoConstraints } = device;
  const { width, height } = videoConstraints;

  useEffect(() => {
    const { deviceId, videoConstraints } = device;
    if (!deviceId || !onDecodeQr) return;
    const reader = new Html5Qrcode(qrcodeRegionId, false);

    reader.start(
      deviceId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        disableFlip: true,
        videoConstraints,
      },
      onDecodeQr,
      () => {
        // on error, do not log ... too verbose
      },
    );

    return () => {
      reader.stop();
    };
  }, [device, onDecodeQr]);

  return (
    <div className="absolute z-top inset-0">
      <div
        id={qrcodeRegionId}
        style={{ width: width as number, height: height as number }}
      />
    </div>
  );
});

export default QrReader;
