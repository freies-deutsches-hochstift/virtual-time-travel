import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFencesFetchParams } from '@virtual-time-travel/app-config';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { FenceId } from '@virtual-time-travel/geo-types';
import { RootState } from '../main';

export const FENCES_FEATURE_KEY = 'fences';

export interface FencesState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
  entries: Array<FenceId> | null;
}

export const initialFencesState: FencesState = {
  loadingStatus: 'not loaded',
  error: null,
  entries: [],
};

export const fetchFences = createAsyncThunk(
  'fences/fetchFences',
  async (_, thunkAPI) => {
    const { data } = await fetchApi(getFencesFetchParams());
    return data as Array<FenceId> | null;
  }
);

export const fencesSlice = createSlice({
  name: FENCES_FEATURE_KEY,
  initialState: initialFencesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFences.pending, (state) => {
      state.loadingStatus = 'loading';
      state.entries = null;
      state.error = null;
    });

    builder.addCase(fetchFences.fulfilled, (state, action) => {
      state.loadingStatus = 'loaded';
      state.entries = action.payload;
      state.error = null;
    });

    builder.addCase(fetchFences.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch fences';
    });
  },
});

export const fencesReducer = fencesSlice.reducer;

export const fencesActions = fencesSlice.actions;

export const getFencesState = (rootState: RootState): FencesState =>
  rootState[FENCES_FEATURE_KEY];
