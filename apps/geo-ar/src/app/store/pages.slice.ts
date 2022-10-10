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
import { RootState } from '../../main';
import { getPagesConfig } from './config.slice';

export const PAGES_FEATURE_KEY = ConfigDataItems.PAGES;

export type PageId = string | number;

export interface PageEntry {
  id: PageId;
  subpages: Array<string | number>;
  [key: string]: unknown;
}

export interface PagesState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<PageEntry> | null;
}

export const initialPagesState: PagesState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
};

export const fetchPages = createAsyncThunk(
  'pages/fetchPages',
  async (config: AppConfigOptions, thunkAPI) => {
    const fetchParams = config[ConfigDataItems.PAGES].fetchParams;
    const { data } = await fetchApi(fetchParams);
    return data as Array<PageEntry> | null;
  }
);

export const pagesSlice = createSlice({
  name: PAGES_FEATURE_KEY,
  initialState: initialPagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPages.pending, (state) => {
      state.loadingStatus = 'loading';
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchPages.fulfilled, (state, action) => {
      state.loadingStatus = 'loaded';
      state.entries = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPages.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch pages';
    });
  },
});

export const pagesReducer = pagesSlice.reducer;

export const pagesActions = pagesSlice.actions;

export const getPagesState = (rootState: RootState): PagesState =>
  rootState[PAGES_FEATURE_KEY];

export const usePageById = () => {
  return createSelector(
    [getPagesState, (_, pageId) => pageId],
    (state, pageId) => {
      return state.entries?.find((p: PageEntry) => p.id === pageId);
    }
  );
};

export const selectSplashPageContent = createSelector(
  [getPagesConfig],
  ({ contentUrl }) => {
    return [contentUrl, 'splash.md'].join('/');
  }
);

export const selectIntroPageContent = createSelector(
  [getPagesConfig],
  ({ contentUrl }) => {
    return [contentUrl, 'intro.md'].join('/');
  }
);

export const selectListPageContent = createSelector(
  [getPagesConfig],
  ({ contentUrl }) => {
    return [contentUrl, 'list.md'].join('/');
  }
);
