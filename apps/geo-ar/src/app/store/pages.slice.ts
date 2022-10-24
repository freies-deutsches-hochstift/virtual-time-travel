import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  AppConfigOptions,
  ConfigDataItems,
} from "@virtual-time-travel/app-config";
import { getLocalizedMarkdownContent } from "@virtual-time-travel/app-router";
import { fetchApi } from "@virtual-time-travel/fetch-api";
import {
  getLocalizedField,
  LocalizedKey,
} from "@virtual-time-travel/localization";
import { RootState } from "../../main";
import { getPagesConfig } from "./config.slice";
import { getLocalesState } from "./locales.slice";

export const PAGES_FEATURE_KEY = ConfigDataItems.PAGES;

export type PageId = string | number;

export interface PageEntry {
  id: PageId;
  identifier: string;
  slug: string | null | LocalizedKey;
  title: string | null | LocalizedKey;
  subpages: Array<string | number>;
  [key: string]: unknown;
}

export interface LocalizedPage extends PageEntry {
  slug: string;
  title: string;
}

export interface EnhancedPageEntry extends LocalizedPage {
  subpages: Array<PageId>;
  contentUrl: string;
}

export interface PageWithSubpages {
  page: EnhancedPageEntry;
  subpages: Array<EnhancedPageEntry>;
}

export interface PagesState {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | null;
  entries: Array<PageEntry> | null;
}

export const initialPagesState: PagesState = {
  loadingStatus: "not loaded",
  error: null,
  entries: [],
};

export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (config: AppConfigOptions, thunkAPI) => {
    const fetchParams = config[ConfigDataItems.PAGES].fetchParams;
    const { data } = await fetchApi(fetchParams);
    return data as Array<PageEntry> | null;
  },
);

export const pagesSlice = createSlice({
  name: PAGES_FEATURE_KEY,
  initialState: initialPagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPages.pending, (state) => {
      state.loadingStatus = "loading";
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchPages.fulfilled, (state, action) => {
      state.loadingStatus = "loaded";
      state.entries = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPages.rejected, (state) => {
      state.loadingStatus = "error";
      state.entries = null;
      state.error = "Could not fetch pages";
    });
  },
});

export const pagesReducer = pagesSlice.reducer;

export const pagesActions = pagesSlice.actions;

export const getPagesState = (rootState: RootState): PagesState =>
  rootState[PAGES_FEATURE_KEY];

export const selectAllPages = createSelector(
  [getPagesState, getLocalesState],
  ({ entries }, { current: currentLocale }) =>
    entries?.map(
      (e) =>
        ({
          ...e,
          title: getLocalizedField(e.title, currentLocale),
          slug: getLocalizedField(e.slug, currentLocale),
        } as LocalizedPage),
    ),
);

export const usePageWithSubpages = () => {
  return createSelector(
    [selectAllPages, getPagesConfig, (_, pageSlug) => pageSlug],
    (pages, { contentUrl }, pageSlug) => {
      const page = pages?.find((p: PageEntry) => p.slug === pageSlug);

      if (!page) return null;
      const { subpages: subpagesIds } = page;
      const subpages = pages?.filter(
        (p: PageEntry) => !!(subpagesIds || []).find((spId) => spId === p.id),
      );

      return {
        page: {
          ...page,
          contentUrl: getLocalizedMarkdownContent(contentUrl, page.identifier),
        },

        subpages: subpages || [],
      } as PageWithSubpages;
    },
  );
};

export const usePageFromIdentifier = () => {
  return createSelector(
    [selectAllPages, getPagesConfig, (_, identifier) => identifier],
    (pages, { contentUrl }, identifier) => {
      const page = pages?.find((p: PageEntry) => p.identifier === identifier);
      if (!page) return null;
      return {
        ...page,
        contentUrl: getLocalizedMarkdownContent(contentUrl, page.identifier),
      };
    },
  );
};
