import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPovsFetchParams } from '@virtual-time-travel/app-config';
import { fetchApi } from '@virtual-time-travel/fetch-api';
import { GeolibGeoJSONPoint } from 'geolib/es/types';
import { RootState } from '../main';

export const POVS_FEATURE_KEY = 'povs';

export interface PovId {
  id: string | number;
  coordinates: GeolibGeoJSONPoint;
  fenceId: string | number;
}

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

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchPovs())
 * }, [dispatch]);
 * ```
 */
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

/*
 * Export reducer for store configuration.
 */
export const povsReducer = povsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(povsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const povsActions = povsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPovs);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getPovsState = (rootState: RootState): PovsState =>
  rootState[POVS_FEATURE_KEY];
