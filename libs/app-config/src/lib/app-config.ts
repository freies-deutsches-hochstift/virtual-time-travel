import merge from 'ts-deepmerge';
const DATA_ROOT = '/assets/items';

export enum ConfigDataItems {
  FENCES = 'fences',
  POVS = 'povs',
  DIALOGS = 'dialogs',
  LOCALES = 'locales',
  PAGES = 'pages',
}

export enum DialogsContentsIds {
  RequestCamera = 'request-camera',
  RequestOrientation = 'request-orientation',
  RequestGeolocation = 'request-geolocation',
  OutOfGeoFence = 'out-of-geofence',
  ArUnavailable = 'ar-unavailable',
}

export interface DataFetchParamsRes {
  url: string;
  type: string;
}

export interface ConfigDataItem {
  fetchParams: DataFetchParamsRes;
  mediasUrl: string;
  contentUrl: string;
}

type DataItems = {
  [key in ConfigDataItems]: ConfigDataItem;
};

export interface AppConfigOptions extends DataItems {
  DATA_ROOT: string;
  DISABLE_QR: boolean;
  INVIEW_THRESHOLD_ANGLE: number;
  INVIEW_THRESHOLD_DISTANCE: number;
}

const defaultDataItems: {
  [key: string]: unknown;
} = {};

for (const item in ConfigDataItems) {
  const key = ConfigDataItems[item as keyof typeof ConfigDataItems];
  const scopeRoot = [DATA_ROOT, key].join('/');
  defaultDataItems[key] = {
    fetchParams: {
      url: [scopeRoot, 'index.csv'].join('/'),
      type: 'csv',
    },
    mediasUrl: [scopeRoot, 'medias'].join('/'),
    contentUrl: [scopeRoot, 'locales'].join('/'),
  } as ConfigDataItem;
}

export const defaultAppConfig = {
  DATA_ROOT: '/assets/items',
  ...(defaultDataItems as unknown as DataItems),
  DISABLE_QR: false,
  INVIEW_THRESHOLD_ANGLE: 20,
  INVIEW_THRESHOLD_DISTANCE: 100,
};

export function deepMergeConfig(
  defaultConfig: AppConfigOptions,
  appConfig: DataItems
): AppConfigOptions {
  return merge(defaultConfig, appConfig);
}
