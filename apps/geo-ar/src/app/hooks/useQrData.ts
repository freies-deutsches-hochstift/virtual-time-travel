import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';

export const useQrData = () => {
  const navigate = useNavigate();

  const onReadQr = useCallback(
    (text: string) => {
      console.debug('QR SCANNED with text', text);
      if (!text) return;

      const redirectParams = getQrNavigateParams(text);

      if (!redirectParams) return navigate('/qr?povId=wrong-format');

      const { hash, search } = redirectParams;

      navigate([hash, qs.stringify(search)].join('?'));
    },
    [navigate]
  );

  return onReadQr;
};

export const getHashSearchParams = (search = '') => {
  return qs.parse(search);
};

export const getQrRedirectParams = (text: string) => {
  try {
    const qrUrl = new URL(text);
    if (window.location.origin !== qrUrl.origin) return null;
    return getNavigateParams(qrUrl.hash);
  } catch (e) {
    return getNavigateParams(text);
  }
};

export const getNavigateParams = (hashFromLocation: string) => {
  const [hash, params] = hashFromLocation.split('?');
  const search = getHashSearchParams(params);

  return { hash: hash.replace('#/', '/'), search };
};

export const getQrNavigateParams = (text: string) => {
  const redirectParams = getQrRedirectParams(text);
  if (!redirectParams) return null;
  const { search } = redirectParams;
  // return invalid qr if search does not contain povId
  if ('povId' in search) return redirectParams;
  return null;
};
