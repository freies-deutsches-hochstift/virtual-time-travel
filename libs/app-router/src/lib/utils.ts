import qs from 'query-string';

export enum MainRoutes {
  Home = '',
  Intro = 'welcome',
  Explore = 'explore',
  Qr = 'qr',
  List = 'list',
  Menu = 'menu',
}

export type OnSelectPov = (id: string | number) => void;

export const currentPovSearchParam = 'povId';
export const invalidQrParam = 'invalidQr';

export interface QrRedirectParams {
  hash: string;
  search: qs.ParsedQuery<string>;
}

export const getRoutePath = (route: string) => {
  return `/${route}`;
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
  if (currentPovSearchParam in search) return redirectParams;
  return null;
};

const invalidQrSearch = { [invalidQrParam]: true };

export const invalidQrRoute = [
  getRoutePath(MainRoutes.Qr),
  qs.stringify(invalidQrSearch),
].join('?');

export const getQrRedirectRoute = (redirectParams: QrRedirectParams) => {
  const { hash, search } = redirectParams;
  return [hash, qs.stringify(search)].join('?');
};

/**
 * the pov detail can be opened from different routes as overlay
 * so we just want to add/replace current pov param
 */

export const getOnSelectPovRoute = (povId: string | number) => {
  const { hash, search } = getNavigateParams(window.location.hash);
  return [
    hash,
    qs.stringify({ ...search, [currentPovSearchParam]: povId }),
  ].join('?');
};
