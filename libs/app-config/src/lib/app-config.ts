import merge from "ts-deepmerge";
const DATA_ROOT = "/assets/items";

export enum ConfigDataItems {
  FENCES = "fences",
  POVS = "povs",
  DIALOGS = "dialogs",
  LOCALES = "locales",
  PAGES = "pages",
}

export enum DialogsContentsIds {
  RequestCamera = "request-camera",
  RequestGeolocation = "request-geolocation",
  OutOfGeoFence = "out-of-geofence",
  ArUnavailable = "ar-unavailable",
  ArTutorial = "ar-tutorial",
  CameraUnavailable = "camera-unavailable",
  InvalidQr = "invalid-qr",
  PovNotFound = "pov-404",
  ForcePortrait = "force-portrait",
  ForceOrientation = "force-orientation",
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
  DISABLE_EXPLORE: boolean;
  INVIEW_THRESHOLD_ANGLE: number;
  INVIEW_THRESHOLD_DISTANCE: number;
  LOOK_AROUND_MIN_DISTANCE: number;
  GET_CLOSER_MIN_DISTANCE: number;
}

const defaultDataItems: {
  [key: string]: unknown;
} = {};

for (const item in ConfigDataItems) {
  const key = ConfigDataItems[item as keyof typeof ConfigDataItems];
  const scopeRoot = [DATA_ROOT, key].join("/");
  defaultDataItems[key] = {
    fetchParams: {
      url: [scopeRoot, "index.csv"].join("/"),
      type: "csv",
    },
    mediasUrl: [scopeRoot, "medias"].join("/"),
    contentUrl: [scopeRoot, "locales"].join("/"),
  } as ConfigDataItem;
}

export const defaultAppConfig = {
  DATA_ROOT: "/assets/items",
  ...(defaultDataItems as unknown as DataItems),
  DISABLE_QR: false,
  DISABLE_EXPLORE: false,
  INVIEW_THRESHOLD_ANGLE: 20,
  INVIEW_THRESHOLD_DISTANCE: 100,
  LOOK_AROUND_MIN_DISTANCE: 100,
  GET_CLOSER_MIN_DISTANCE: 100,
};

export function deepMergeConfig(
  defaultConfig: AppConfigOptions,
  appConfig: DataItems,
): AppConfigOptions {
  return merge(defaultConfig, appConfig);
}
