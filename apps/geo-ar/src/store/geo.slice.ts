import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  geolocation,
  StateOrientation,
  StatePosition,
} from '@virtual-time-travel/geo';
import { RootState } from '../main';
import { FenceId, getFencesState } from './fences.slice';
import { getPovsState, PovId } from './povs.slice';

export const GEO_FEATURE_KEY = 'geo';

export interface GeoState {
  position: StatePosition;
  orientation: StateOrientation;
}

export const initialGeoState: GeoState = {
  position: null,
  orientation: null,
};

export interface CurrentPov extends PovId {
  distance: number | null;
  bearingDistance: number | null;
}

export interface CurrentGeoFence {
  fence: FenceId | undefined;
  povs: Array<CurrentPov>;
}

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

export const selectCurrentGeoFence = createSelector(
  [getGeoState, getFencesState, getPovsState],
  (
    { position },
    { entries: fences },
    { entries: povs }
  ): CurrentGeoFence | null => {
    if (!position) return null;

    const currentFence = fences?.find(
      (fence) =>
        !!fence.geometry?.find(
          (g) =>
            !!geolocation.isPointInPolygon(
              {
                longitude: position.coordinates[0],
                latitude: position.coordinates[1],
              },
              g
            )
        )
    );

    const currentPovs = (povs || [])
      .filter(
        (pov) =>
          pov.fenceId === currentFence?.id && pov.coordinates.length === 2
      )
      .map((pov) => ({
        ...pov,
        distance: geolocation.getDistance(
          {
            longitude: position.coordinates[0],
            latitude: position.coordinates[1],
          },
          { longitude: pov.coordinates[0], latitude: pov.coordinates[1] }
        ),
        bearingDistance: geolocation.getBearingDistance(
          position.coordinates,
          pov.coordinates
        ),
      }));

    // TODO !!! ???
    // if there are no points in view show directions to clostest one?
    // should we filter povs by

    return {
      fence: currentFence,
      povs: currentPovs,
    };
  }
);
