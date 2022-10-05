/**
 * TODO: decide how do we want to actually handle generic app config
 *
 */

export const DATA_ROOT = process.env?.['NX_DATA_ROOT'] || '/assets/items';

export const DATA_FENCES =
  process.env?.['NX_DATA_FENCES'] || 'fences/index.csv';
export const DATA_FENCES_TYPE = process.env?.['NX_DATA_FENCES_TYPE'] || 'csv';

export const DATA_POVS_TYPE = process.env?.['NX_DATA_POVS_TYPE'] || 'csv';
export const DATA_POVS = process.env?.['NX_DATA_POVS'] || 'povs/index.csv';

export const DATA_PAGES_TYPE = process.env?.['NX_DATA_PAGES_TYPE'] || 'csv';
export const DATA_PAGES = process.env?.['NX_DATA_PAGES'] || 'pages/index.csv';

export const DATA_LOCALES_TYPE = process.env?.['NX_DATA_LOCALES_TYPE'] || 'csv';
export const DATA_LOCALES =
  process.env?.['NX_DATA_LOCALES'] || 'locales/index.csv';

export const FETCH_POVS_URL = [DATA_ROOT, DATA_POVS].join('/');
export const FETCH_FENCES_URL = [DATA_ROOT, DATA_FENCES].join('/');
export const FETCH_PAGES_URL = [DATA_ROOT, DATA_PAGES].join('/');
export const FETCH_LOCALES_URL = [DATA_ROOT, DATA_LOCALES].join('/');
