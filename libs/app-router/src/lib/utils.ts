import qs from 'query-string';

interface VariableObjectKeys {
  [key: string]: string | number | VariableObjectKeys;
}

export enum MainRoutes {
  Home = 'home',
  Intro = 'intro',
  Explore = 'explore',
  Qr = 'qr',
  List = 'list',
  Menu = 'menu',
  Pov = 'pov',
  NotFound = 'not-found',
}

export type OnSelectPov = (id: string | number) => void;

export interface LocalizedRoute {
  routeKey: string;
  path: string;
  route: string;
}

export const currentPovSearchParam = 'povId';
export const invalidQrParam = 'invalidQr';

export interface QrRedirectParams {
  hash: string;
  search: qs.ParsedQuery<string>;
}

export const getRoutePath = (route: string) => {
  return `/${route}`;
};

export const getLocalizedRoutePath = (locale: string, route: string) => {
  return `/${[locale, route].filter(Boolean).join('/')}`;
};

export const getHashSearchParams = (search = '') => {
  return qs.parse(search);
};

export const getQrRedirectParams = (qrRoute: LocalizedRoute, text: string) => {
  try {
    const qrUrl = new URL(text);
    if (window.location.origin !== qrUrl.origin) return null;
    return getQrRedirect(qrRoute, qrUrl.hash);
  } catch (e) {
    return getQrRedirect(qrRoute, text);
  }
};

export const getQrRedirect = (qrRoute: LocalizedRoute, text: string) => {
  const { hash, search } = getNavigateParams(text);
  const [, route, id] = hash.split('/');

  if (route !== MainRoutes.Pov) return null;
  return {
    hash: qrRoute.path,
    search: { ...search, [currentPovSearchParam]: id.toString() },
  };
};

export const getNavigateParams = (hashFromLocation: string) => {
  const [hash, params] = hashFromLocation.split('?');
  const search = getHashSearchParams(params);

  return { hash: hash.replace('#/', '/'), search };
};

export const getQrNavigateParams = (qrRoute: LocalizedRoute, text: string) => {
  const redirectParams = getQrRedirectParams(qrRoute, text);
  if (!redirectParams) return null;
  const { search } = redirectParams;
  // return invalid qr if search does not contain povId
  if (currentPovSearchParam in search) return redirectParams;
  return null;
};

export const getQrRedirectRoute = (redirectParams: QrRedirectParams) => {
  const { hash, search } = redirectParams;
  return [hash, qs.stringify(search)].join('?');
};

/**
 * the pov detail can be opened from different routes as overlay
 * so we just want to add/replace current pov param
 */

export const getOnSelectPovRoute = (povId: string | number | null) => {
  const { hash, search } = getNavigateParams(window.location.hash);
  const nextSearch = {
    ...search,
    [currentPovSearchParam]: povId,
  } as VariableObjectKeys;

  for (const key in nextSearch) {
    if (key === currentPovSearchParam && nextSearch[key] === null) {
      delete nextSearch[key];
    }
  }

  return [hash, qs.stringify(nextSearch)].join('?');
};

export const isExternalUrl = (string: string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

export const getAssetUrl = (
  localPath: string,
  assetFilename?: string | null
) => {
  if (!assetFilename) return null;
  if (isExternalUrl(assetFilename)) return assetFilename;
  return [localPath, assetFilename].join('/');
};

export const getLocalizedMarkdownContent = (
  localPath: string,
  contentId: string | number
) => {
  return [localPath, `${contentId}.md`].join('/');
};
