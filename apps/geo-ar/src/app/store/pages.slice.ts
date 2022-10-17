import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  AppConfigOptions,
  ConfigDataItems,
} from '@virtual-time-travel/app-config';
import { getLocalizedMarkdownContent } from '@virtual-time-travel/app-router';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import {
  getLocalizedField,
  LocalizedKey,
} from '@virtual-time-travel/localization';
import { RootState } from '../../main';
import { getPagesConfig } from './config.slice';
import { getLocalesState } from './locales.slice';

export const PAGES_FEATURE_KEY = ConfigDataItems.PAGES;

export type PageId = string | number;

export interface PageEntry {
  id: PageId;
  slug: string;
  subpages: Array<string | number>;
  title: string | null | LocalizedKey;
  [key: string]: unknown;
}

export interface EnhancedPageEntry extends PageEntry {
  subpages: Array<PageId>;
  localizedTitle: string;
  contentUrl: string;
}

export interface PageWithSubpages {
  page: EnhancedPageEntry;
  subpages: Array<EnhancedPageEntry>;
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

export const usePageWithSubpages = () => {
  return createSelector(
    [getPagesState, getLocalesState, getPagesConfig, (_, pageSlug) => pageSlug],
    (state, { current: currentLocale }, { contentUrl }, pageSlug) => {
      const pages = state.entries || [];
      const page = state.entries?.find(
        (p: PageEntry) => p['slug'] === pageSlug
      );

      if (!page) return null;
      const { subpages: subpagesIds } = page;
      const subpages = pages.filter(
        (p: PageEntry) => !!(subpagesIds || []).find((spId) => spId === p.id)
      );

      return {
        page: {
          ...page,
          localizedTitle: getLocalizedField(page.title, currentLocale),
          contentUrl: getLocalizedMarkdownContent(contentUrl, page.slug),
        },

        subpages:
          subpages.map((sp) => ({
            ...sp,
            localizedTitle: getLocalizedField(sp.title, currentLocale),
          })) || [],
      } as PageWithSubpages;
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
