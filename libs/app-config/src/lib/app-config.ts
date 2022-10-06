const DATA_ROOT = process.env?.['NX_DATA_ROOT'] || '/assets/items';

const DATA_FENCES = process.env?.['NX_DATA_FENCES'] || 'fences';
const DATA_FENCES_TYPE = process.env?.['NX_DATA_FENCES_TYPE'] || 'csv';

const DATA_POVS = process.env?.['NX_DATA_POVS'] || 'povs';
const DATA_POVS_TYPE = process.env?.['NX_DATA_POVS_TYPE'] || 'csv';

const DATA_PAGES = process.env?.['NX_DATA_PAGES'] || 'pages';
const DATA_PAGES_TYPE = process.env?.['NX_DATA_PAGES_TYPE'] || 'csv';

const DATA_LOCALES = process.env?.['NX_DATA_LOCALES'] || 'locales';
const DATA_LOCALES_TYPE = process.env?.['NX_DATA_LOCALES_TYPE'] || 'csv';

const DATA_DIALOGS = process.env?.['NX_DATA_DIALOGS'] || 'dialogs';

const DISABLE_ORIENTATION =
  process.env?.['NX_DISABLE_ORIENTATION'] === 'true' || false;

export interface DataFetchParamsRes {
  url: string;
  type: string;
}

const getDataFetchParams = (
  scope: string,
  type: string
): DataFetchParamsRes => ({
  url: [DATA_ROOT, scope, `index.${type}`].join('/'),
  type,
});

const getDataContentBaseUrl = (scope: string, locale: string): string =>
  [DATA_ROOT, scope, 'locales', locale].join('/');

export const getDataRoot = () => DATA_ROOT;

// for development purpose
// you might want to switch device orientation off since is not avail on most pcs
export const getUseOrientation = () => !DISABLE_ORIENTATION;

console.log(DISABLE_ORIENTATION);

export const getFencesFetchParams = () =>
  getDataFetchParams(DATA_FENCES, DATA_FENCES_TYPE);

export const getFencesContentBaseUrl = (locale: string) =>
  getDataContentBaseUrl(DATA_FENCES, locale);

export const getPovsFetchParams = () =>
  getDataFetchParams(DATA_POVS, DATA_POVS_TYPE);

export const getPovsContentBaseUrl = (locale: string) =>
  getDataContentBaseUrl(DATA_POVS, locale);

export const getLocalesFetchParams = () =>
  getDataFetchParams(DATA_LOCALES, DATA_LOCALES_TYPE);

export const getPagesFetchParams = () =>
  getDataFetchParams(DATA_PAGES, DATA_PAGES_TYPE);

export const getPagesContentBaseUrl = (locale: string) =>
  getDataContentBaseUrl(DATA_PAGES, locale);

export const getDialogsContentBaseUrl = (locale: string) =>
  getDataContentBaseUrl(DATA_DIALOGS, locale);
