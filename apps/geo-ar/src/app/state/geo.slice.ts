import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { StatePosition, StateOrientation } from '@virtual-time-travel/geo';

import { RootState } from '../../main';

export const GEO_FEATURE_KEY = 'geo';

export interface GeoState {
  position: StatePosition;
  orientation: StateOrientation;
}

export const initialGeoState: GeoState = {
  position: null,
  orientation: null,
};

export const geoSlice = createSlice({
  name: GEO_FEATURE_KEY,
  initialState: initialGeoState,
  reducers: {
    updateLocation(
      state: GeoState,
      action: PayloadAction<StatePosition | null>
    ) {
      const { payload } = action;
      state.position = payload;
    },

    updateOrientation(
      state: GeoState,
      action: PayloadAction<StateOrientation | null>
    ) {
      const { payload } = action;
      state.orientation = payload;
    },
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

export const getGeoState = (rootState: RootState): GeoState =>
  rootState[GEO_FEATURE_KEY];

export const selectPosition = createSelector(
  getGeoState,
  ({ position }) => position
);

export const selectOrientation = createSelector(
  getGeoState,
  ({ orientation }) => orientation
);
