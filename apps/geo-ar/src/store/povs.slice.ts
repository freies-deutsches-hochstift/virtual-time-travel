import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getPovsFetchParams } from '@virtual-time-travel/app-config';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { PovId } from '@virtual-time-travel/geo-types';
import { RootState } from '../main';

export const POVS_FEATURE_KEY = 'povs';

export interface PovsState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<PovId> | null;
}

export const initialPovsState: PovsState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
};

export const fetchPovs = createAsyncThunk(
  'povs/fetchPovs',
  async (_, thunkAPI) => {
    const { data } = await fetchApi(getPovsFetchParams());
    return data as Array<PovId> | null;
  }
);

export const povsSlice = createSlice({
  name: POVS_FEATURE_KEY,
  initialState: initialPovsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPovs.pending, (state) => {
      state.loadingStatus = 'loading';
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchPovs.fulfilled, (state, action) => {
      state.loadingStatus = 'loaded';
      state.entries = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPovs.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch povs';
    });
  },
});

export const povsReducer = povsSlice.reducer;

export const getPovsState = (rootState: RootState): PovsState =>
  rootState[POVS_FEATURE_KEY];

export const selectAllPovs = createSelector(
  getPovsState,
  ({ entries }) => entries
);
