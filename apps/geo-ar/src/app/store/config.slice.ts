import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AppConfigOptions,
  ConfigDataItems,
  deepMergeConfig,
  defaultAppConfig,
} from "@virtual-time-travel/app-config";
import { fetchApi } from "@virtual-time-travel/fetch-api";
import { RootState } from "../../main";
import { getLocalesState } from "./locales.slice";

export const CONFIG_FEATURE_KEY = "config";

export interface ConfigState {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | null;
  appConfig: AppConfigOptions;
}

export const initialConfigState: ConfigState = {
  loadingStatus: "not loaded",
  error: null,
  appConfig: defaultAppConfig,
};

export const fetchConfig = createAsyncThunk(
  "config/fetchConfig",
  async (_, thunkAPI) => {
    const { data } = await fetchApi({ url: "/assets/config.csv", type: "csv" });
    return data?.[0] as AppConfigOptions;
  },
);

export const configSlice = createSlice({
  name: CONFIG_FEATURE_KEY,
  initialState: initialConfigState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.pending, (state) => {
      state.loadingStatus = "loading";
      state.error = null;
    });

    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.appConfig = deepMergeConfig(state.appConfig, action.payload);
      state.error = null;
    });

    builder.addCase(fetchConfig.rejected, (state) => {
      state.loadingStatus = "error";
      state.error = "Could not fetch appConfig";
    });
  },
});

export const configReducer = configSlice.reducer;

export const configActions = configSlice.actions;

export const getConfigState = (rootState: RootState): ConfigState =>
  rootState[CONFIG_FEATURE_KEY];

export const selectHasConfig = createSelector(
  getConfigState,
  ({ loadingStatus }) => loadingStatus === "loaded",
);

export const selectConfig = createSelector(
  getConfigState,
  ({ appConfig }) => appConfig,
);

export const getLocalizedConfig = createSelector(
  [getConfigState, getLocalesState],
  ({ appConfig }, { current: currentLocale }) => {
    return {
      appConfig,
      currentLocale,
    };
  },
);

export const getPovsConfig = createSelector(
  [getLocalizedConfig],
  ({ appConfig, currentLocale }) => {
    const config = appConfig[ConfigDataItems.POVS];
    return {
      ...config,
      contentUrl: [config.contentUrl, currentLocale].join("/"),
    };
  },
);

export const getPagesConfig = createSelector(
  [getLocalizedConfig],
  ({ appConfig, currentLocale }) => {
    const config = appConfig[ConfigDataItems.PAGES];
    return {
      ...config,
      contentUrl: [config.contentUrl, currentLocale].join("/"),
    };
  },
);
