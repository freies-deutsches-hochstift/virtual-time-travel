import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  AppConfigOptions,
  ConfigDataItems,
} from "@virtual-time-travel/app-config";
import {
  getAssetUrl,
  getLocalizedMarkdownContent,
} from "@virtual-time-travel/app-router";
import { fetchApi } from "@virtual-time-travel/fetch-api";
import { PovId } from "@virtual-time-travel/geo-types";
import { getLocalizedField } from "@virtual-time-travel/localization";
import { RootState } from "../../main";
import { getPovsConfig } from "./config.slice";
import { getLocalesState } from "./locales.slice";

export const POVS_FEATURE_KEY = ConfigDataItems.POVS;

export interface PovsState {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | null;
  entries: Array<PovId> | null;
  currentId: string | null;
}

export const initialPovsState: PovsState = {
  loadingStatus: "not loaded",
  error: null,
  entries: [],
  currentId: null,
};

export const fetchPovs = createAsyncThunk(
  "povs/fetchPovs",
  async (config: AppConfigOptions, thunkAPI) => {
    const fetchParams = config[ConfigDataItems.POVS].fetchParams;
    const { data } = await fetchApi(fetchParams);
    return data as Array<PovId> | null;
  },
);

export const povsSlice = createSlice({
  name: POVS_FEATURE_KEY,
  initialState: initialPovsState,
  reducers: {
    setCurrentId(state: PovsState, action: PayloadAction<string | null>) {
      state.currentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPovs.pending, (state) => {
      state.loadingStatus = "loading";
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchPovs.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.entries = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPovs.rejected, (state) => {
      state.loadingStatus = "error";
      state.entries = null;
      state.error = "Could not fetch povs";
    });
  },
});

export const povsReducer = povsSlice.reducer;
export const povsActions = povsSlice.actions;

export const getPovsState = (rootState: RootState): PovsState =>
  rootState[POVS_FEATURE_KEY];

export const selectAllPovs = createSelector(
  [getPovsState, getLocalesState, getPovsConfig],
  ({ entries }, { current: currentLocale }, { contentUrl, mediasUrl }) =>
    entries?.map((e) => ({
      ...e,
      localizedTitle: getLocalizedField(e.title, currentLocale),
      coverSrc: getAssetUrl(mediasUrl, e.cover),
      contentUrl: getLocalizedMarkdownContent(contentUrl, e.id),
    })),
);

export const selectCurrentPov = createSelector(
  [getPovsState, selectAllPovs],
  ({ currentId }, povs) => {
    if (!currentId || !povs?.length) return null;
    return (
      povs?.find((p) => p.id.toString() === currentId.toString()) || "::404::"
    );
  },
);

export const usePovFromId = () => {
  return createSelector([selectAllPovs, (_, povId) => povId], (povs, povId) => {
    return povs?.find((p) => p.id.toString() === povId.toString()) || "::404::";
  });
};
