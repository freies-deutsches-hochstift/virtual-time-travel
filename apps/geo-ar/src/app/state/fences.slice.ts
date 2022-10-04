import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { GeolibGeoJSONPoint } from 'geolib/es/types';
import { DATA_FENCES_TYPE, FETCH_FENCES_URL } from '../../config';
import { RootState } from '../../main';

export const FENCES_FEATURE_KEY = 'fences';

export interface FenceId {
  id: string | number;
  title: string;
  geometry: Array<Array<GeolibGeoJSONPoint>>;
}

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
    const { data } = await fetchApi(FETCH_FENCES_URL, DATA_FENCES_TYPE);

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

      const entries = action.payload;

      state.entries = entries;
      // entries

      // entries.map((e) => ({
      //   ...e,
      //   geometry: geolocation.normalizeGeometryCoords(
      //     e.geometry
      //   ),
      // }));

      state.error = null;
    });

    builder.addCase(fetchFences.rejected, (state) => {
      state.loadingStatus = 'error';
      state.entries = null;
      state.error = 'Could not fetch povs';
    });
  },
});

export const fencesReducer = fencesSlice.reducer;

export const povsActions = fencesSlice.actions;

export const getFencesState = (rootState: RootState): FencesState =>
  rootState[FENCES_FEATURE_KEY];
