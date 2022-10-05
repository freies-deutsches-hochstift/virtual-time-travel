import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { DATA_LOCALES_TYPE, FETCH_LOCALES_URL } from '../../config';
import { RootState } from '../../main';

export const LOCALES_FEATURE_KEY = 'locales';

export interface LocaleId {
  slug: string;
  label: string;
  default: boolean;
}

export interface LocalesState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<LocaleId> | null;
  current: string | null;
  default: string;
}

export const initialLocalesState: LocalesState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
  current: null,
  default: 'de',
};

// TODO, import locales from cvs
export const fetchLocales = createAsyncThunk(
  'locales/fetchLocales',
  async (_, thunkAPI) => {
    const { data } = await fetchApi(FETCH_LOCALES_URL, DATA_LOCALES_TYPE);

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
      const defaultLocale =
        (locales || []).find((l) => l.default === true)?.slug || 'de';
      state.entries = locales;
      state.default = defaultLocale;
      state.current = defaultLocale;
      state.error = null;
    });

    builder.addCase(fetchLocales.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch povs';
    });
  },
});

export const localesReducer = localesSlice.reducer;

export const localesActions = localesSlice.actions;

export const getLocalesState = (rootState: RootState): LocalesState =>
  rootState[LOCALES_FEATURE_KEY];
