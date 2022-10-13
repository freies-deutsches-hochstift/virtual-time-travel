import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQrNavigateParams, getQrRedirectRoute } from '../utils';

export type OnDecodeQr = (text: string) => unknown;
export type SetInvalidQr = (isValid: boolean) => void;

export const useQrData = (setInvalidQr: SetInvalidQr) => {
  /**
   * the return methods of this hook are used to initialize the qr engine
   * so it is important to use an external state not to trigger any re-render
   */

  const navigate = useNavigate();
  const scanned = useRef(false);

  const onDecodeQr = useCallback(
    (result) => {
      if (scanned.current) return;
      console.debug('QR SCANNED with text', result);
      if (!result) return;
      scanned.current = true;
      const redirectParams = getQrNavigateParams(result);
      if (!redirectParams) return setInvalidQr(true);
      navigate(getQrRedirectRoute(redirectParams));
    },
    [navigate, setInvalidQr]
  ) as OnDecodeQr;

  const onResetQrReader = useCallback(() => {
    scanned.current = false;
    setInvalidQr(false);
  }, [setInvalidQr]);

  return { onDecodeQr, onResetQrReader };
};
