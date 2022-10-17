import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  AppConfigOptions,
  ConfigDataItems,
} from '@virtual-time-travel/app-config';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { AvailLocales } from '@virtual-time-travel/localization';
import { RootState } from '../../main';

export const LOCALES_FEATURE_KEY = ConfigDataItems.LOCALES;

export interface LocaleId {
  slug: string;
  label: string;
  default: boolean;
  labels?: Labels;
}

type Labels = {
  [key: string]: string;
};

export interface LocalesState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<LocaleId> | null;
  current: AvailLocales;
  default: AvailLocales;
}

const baseLocale = Object.keys(AvailLocales)[0] as AvailLocales;
export const initialLocalesState: LocalesState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
  current: baseLocale,
  default: baseLocale,
};

export const fetchLocales = createAsyncThunk(
  'locales/fetchLocales',
  async (config: AppConfigOptions, thunkAPI) => {
    const fetchParams = config[ConfigDataItems.LOCALES].fetchParams;
    const { data } = await fetchApi(fetchParams);
    return data as Array<LocaleId> | null;
  }
);

export const localesSlice = createSlice({
  name: LOCALES_FEATURE_KEY,
  initialState: initialLocalesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocales.pending, (state) => {
      state.loadingStatus = 'loading';
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchLocales.fulfilled, (state, action) => {
      state.loadingStatus = 'loaded';
      const locales = action.payload;
      const defaultLocale = ((locales || []).find((l) => l.default === true)
        ?.slug || baseLocale) as AvailLocales;

      state.entries = locales;
      state.default = defaultLocale;
      state.current = defaultLocale;
      state.error = null;
    });

    builder.addCase(fetchLocales.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch locales';
    });
  },
});

export const localesReducer = localesSlice.reducer;

export const localesActions = localesSlice.actions;

export const getLocalesState = (rootState: RootState): LocalesState =>
  rootState[LOCALES_FEATURE_KEY];

export const selectCurrentLocale = createSelector(
  getLocalesState,
  ({ current }) => current
);

export const selectLabels = createSelector(
  getLocalesState,
  ({ current, entries }) => {
    const locale = entries?.find((e) => e.slug === current);

    return locale?.labels || {};
  }
);
