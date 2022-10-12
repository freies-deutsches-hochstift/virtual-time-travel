import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getQrNavigateParams,
  getQrRedirectRoute,
  invalidQrRoute,
} from '../utils';

export const useQrData = () => {
  const navigate = useNavigate();

  const onReadQr = useCallback(
    (text: string) => {
      console.debug('QR SCANNED with text', text);
      if (!text) return;
      const redirectParams = getQrNavigateParams(text);
      if (!redirectParams) return navigate(invalidQrRoute);
      navigate(getQrRedirectRoute(redirectParams));
    },
    [navigate]
  );

  return onReadQr;
};
