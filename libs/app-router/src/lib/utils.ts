import qs from 'query-string';

interface VariableObjectKeys {
  [key: string]: string | number | VariableObjectKeys;
}

export enum MainRoutes {
  Home = '',
  Intro = 'tutorial',
  Explore = 'explore',
  Qr = 'qr',
  List = 'list',
  Menu = 'menu',
  Pov = 'pov',
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
    return getQrRedirect(qrUrl.hash);
  } catch (e) {
    return getQrRedirect(text);
  }
};

export const getQrRedirect = (text: string) => {
  const { hash, search } = getNavigateParams(text);
  const [, route, id] = hash.split('/');
  if (route !== MainRoutes.Pov) return null;
  return {
    hash: getRoutePath(MainRoutes.Qr),
    search: { ...search, [currentPovSearchParam]: id.toString() },
  };
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
