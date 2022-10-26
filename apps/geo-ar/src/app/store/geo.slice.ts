import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { geolocation, refineLocation } from "@virtual-time-travel/geo";
import {
  CurrentGeoFence,
  GeoState,
  StateOrientation,
  StatePosition,
} from "@virtual-time-travel/geo-types";
import { RootState } from "../../main";
import { getConfigState } from "./config.slice";
import { getFencesState } from "./fences.slice";
import { selectAllPovs } from "./povs.slice";

export const GEO_FEATURE_KEY = "geo";

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
      action: PayloadAction<StatePosition | null>,
    ) {
      const { payload } = action;
      // alert(JSON.stringify(payload));
      if (state.position && payload)
        state.position = refineLocation(state.position, payload, 500);
      state.position = payload;
    },

    updateOrientation(
      state: GeoState,
      action: PayloadAction<StateOrientation | null>,
    ) {
      const { payload } = action;

      if (payload?.usesRealCompass || !state.orientation) {
        state.orientation = payload;
        return;
      } else {
        if (
          state.orientation?.compassHeading &&
          payload?.compassHeading &&
          Math.abs(
            payload?.compassHeading - state.orientation?.compassHeading,
          ) > 5
        ) {
          state.orientation = payload;
        }
      }
    },
  },
});

export const geoReducer = geoSlice.reducer;

export const geoActions = geoSlice.actions;

export const getGeoState = (rootState: RootState): GeoState =>
  rootState[GEO_FEATURE_KEY];

export const selectPosition = createSelector(
  getGeoState,
  ({ position }) => position,
);

export const selectOrientation = createSelector(
  getGeoState,
  ({ orientation }) => orientation,
);

export const selectCurrentGeoFence = createSelector(
  [getGeoState, getFencesState, selectAllPovs, getConfigState],
  (
    { position, orientation },
    { entries: fences },
    povs,
    { appConfig: { INVIEW_THRESHOLD_ANGLE, INVIEW_THRESHOLD_DISTANCE } },
  ): CurrentGeoFence | null => {
    if (!position) return null;

    const currentPosition = geolocation.getLongLat(position.coordinates);

    const currentFence = fences?.find(
      (fence) =>
        !!fence.geometry.coordinates.find(
          (geometry) =>
            !!geolocation.isPointInPolygon(currentPosition, geometry),
        ),
    );

    const currentPovs = (povs || [])
      .filter(
        (pov) =>
          pov.fence === currentFence?.id &&
          pov.geometry?.coordinates?.length === 2,
      )
      .map((pov) => {
        // TODO, clean this up into libs method!
        const bearingViewportOrientation =
          (orientation?.compassHeading || 0) - (pov.orientation || 0);

        let normalizedBearingViewportOrientation = bearingViewportOrientation;

        if (normalizedBearingViewportOrientation < 0)
          normalizedBearingViewportOrientation += 360;

        const distance = geolocation.getDistance(
          currentPosition,
          geolocation.getLongLat(pov.geometry.coordinates),
        );

        const bearingDistance = geolocation.getBearingDistance(
          position.coordinates,
          pov.geometry.coordinates,
        );

        return {
          ...pov,
          distance,
          bearingDistance,
          bearingViewportOrientation: normalizedBearingViewportOrientation,
          inView: distance < INVIEW_THRESHOLD_DISTANCE,
          inDirectView:
            Math.abs(bearingViewportOrientation) < INVIEW_THRESHOLD_ANGLE,
        };
      });

    return {
      fence: currentFence,
      povs: currentPovs,
    };
  },
);
