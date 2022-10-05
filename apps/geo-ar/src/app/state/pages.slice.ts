import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { DATA_PAGES_TYPE, FETCH_PAGES_URL } from '../../config';
import { RootState } from '../../main';

export const PAGES_FEATURE_KEY = 'pages';

export interface PageId {
  id: string | number;
  subpages: Array<string | number>;
  [key: string]: unknown;
}

export interface PagesState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<PageId> | null;
}

export const initialPagesState: PagesState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
};

export const fetchPages = createAsyncThunk(
  'pages/fetchPages',
  async (_, thunkAPI) => {
    const { data } = await fetchApi(FETCH_PAGES_URL, DATA_PAGES_TYPE);

    return data as Array<PageId> | null;
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
      state.error = 'Could not fetch povs';
    });
  },
});

export const pagesReducer = pagesSlice.reducer;

export const pagesActions = pagesSlice.actions;

export const getPagesState = (rootState: RootState): PagesState =>
  rootState[PAGES_FEATURE_KEY];
