import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../main';

export const GEO_FEATURE_KEY = 'geo';

/*
 * Update these interfaces according to your requirements.
 */
export interface GeoEntity {
  id: number;
}

export interface GeoState extends EntityState<GeoEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const geoAdapter = createEntityAdapter<GeoEntity>();

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
 *   dispatch(fetchGeo())
 * }, [dispatch]);
 * ```
 */
export const fetchGeo = createAsyncThunk(
  'geo/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getGeos()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialGeoState: GeoState = geoAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const geoSlice = createSlice({
  name: GEO_FEATURE_KEY,
  initialState: initialGeoState,
  reducers: {
    add: geoAdapter.addOne,
    remove: geoAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeo.pending, (state: GeoState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchGeo.fulfilled,
        (state: GeoState, action: PayloadAction<GeoEntity[]>) => {
          geoAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchGeo.rejected, (state: GeoState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message || '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const geoReducer = geoSlice.reducer;

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
 *   dispatch(geoActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const geoActions = geoSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllGeo);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = geoAdapter.getSelectors();

export const getGeoState = (rootState: RootState): GeoState =>
  rootState[GEO_FEATURE_KEY];

export const selectAllGeo = createSelector(getGeoState, selectAll);

export const selectGeoEntities = createSelector(getGeoState, selectEntities);
