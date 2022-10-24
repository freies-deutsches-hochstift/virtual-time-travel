import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AppConfigOptions,
  ConfigDataItems,
} from "@virtual-time-travel/app-config";
import { fetchApi } from "@virtual-time-travel/fetch-api";
import {
  AvailLocales,
  getLabel,
  Locales,
  LocalizedField,
} from "@virtual-time-travel/localization";
import { RootState } from "../../main";

export const LOCALES_FEATURE_KEY = ConfigDataItems.LOCALES;

export interface LocalesState {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | null;
  entries: Locales;
  current: AvailLocales;
  defaultLocale: AvailLocales;
}

const baseLocale = Object.keys(AvailLocales)[0] as AvailLocales;
export const initialLocalesState: LocalesState = {
  loadingStatus: "not loaded",
  error: null,
  entries: [],
  current: baseLocale,
  defaultLocale: baseLocale,
};

export const fetchLocales = createAsyncThunk(
  "locales/fetchLocales",
  async (config: AppConfigOptions, thunkAPI) => {
    const fetchParams = config[ConfigDataItems.LOCALES].fetchParams;
    const { data } = await fetchApi(fetchParams);
    return data as Locales;
  },
);

export const localesSlice = createSlice({
  name: LOCALES_FEATURE_KEY,
  initialState: initialLocalesState,
  reducers: {
    setCurrentLocale(state: LocalesState, { payload }) {
      state.current = payload;
      localStorage.setItem("locale", payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocales.pending, (state) => {
      state.loadingStatus = "loading";
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchLocales.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      const locales = action.payload || [];

      const defaultLocale =
        locales.find((l) => l.default === true)?.slug || baseLocale;

      const browserLocale = locales.find(({ slug }) => {
        const matchLang = new RegExp(`^${slug}\\b`);
        return !!matchLang.test(navigator.language);
      });

      const storedLocale = localStorage.getItem("locale");

      const userLocale = (storedLocale ||
        browserLocale?.slug ||
        defaultLocale) as AvailLocales;

      state.entries = locales;
      state.current = userLocale;
      state.defaultLocale = userLocale;
      state.error = null;
    });

    builder.addCase(fetchLocales.rejected, (state) => {
      state.loadingStatus = "error";
      state.entries = null;
      state.error = "Could not fetch locales";
    });
  },
});

export const localesReducer = localesSlice.reducer;

export const localesActions = localesSlice.actions;

export const getLocalesState = (rootState: RootState): LocalesState =>
  rootState[LOCALES_FEATURE_KEY];

export const selectAvailLocales = createSelector(
  getLocalesState,
  ({ defaultLocale, entries: locales }) => ({
    defaultLocale,
    locales: locales?.map((l) => l.slug),
  }),
);

export const selectLocaleState = createSelector(
  getLocalesState,
  ({ current, entries: locales }) => ({ current, locales }),
);

export const selectCurrentLocale = createSelector(
  getLocalesState,
  ({ current, entries }) => {
    return entries?.find((e) => e.slug === current);
  },
);
export const selectCurrentLocaleSlug = createSelector(
  selectCurrentLocale,
  (locale) => locale?.slug || "",
);

export const selectLabels = createSelector(selectCurrentLocale, (locale) => {
  return locale?.labels || {};
});

export const useLabels = () => {
  return createSelector([selectLabels, (_, key) => key], (labels, key) => {
    return getLabel(labels, key) as string;
  });
};

export const scopedLabel = (
  labels: LocalizedField,
  identifier: string,
  key: string,
) => {
  // some labels, like the dialogs ones, can use common values or
  // can be overwritten by scoping them with an identifier
  // eg: labels.myDialog.confirm || labels.confirm
  const labelsForIdentifier = getLabel(labels, identifier) as LocalizedField;
  return getLabel(labelsForIdentifier, key) || getLabel(labels, key) || key;
};
