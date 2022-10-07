import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { geolocation } from '@virtual-time-travel/geo';
import {
  CurrentGeoFence,
  GeoState,
  StateOrientation,
  StatePosition,
} from '@virtual-time-travel/geo-types';
import { RootState } from '../main';
import { getFencesState } from './fences.slice';
import { getPovsState } from './povs.slice';

export const GEO_FEATURE_KEY = 'geo';

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

export const geoReducer = geoSlice.reducer;

export const geoActions = geoSlice.actions;

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
