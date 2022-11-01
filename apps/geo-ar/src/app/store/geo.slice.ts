import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getClosestPovInView,
  getCurrentFence,
  getEnhancedPovs,
  refineLocation,
} from "@virtual-time-travel/geo";
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
  ({ position }) => position,
);

export const selectOrientation = createSelector(
  getGeoState,
  ({ orientation }) => orientation,
);

export const selectCompassHeading = createSelector(
  getGeoState,
  ({ orientation }) => orientation?.compassHeading,
);

export const selectCurrentBaseGeoFence = createSelector(
  [selectPosition, getFencesState],
  (position, { entries: fences }) => {
    if (!position || !fences) return null;
    return getCurrentFence(fences, position);
  },
);

export const selectIsInGeoFence = createSelector(
  [selectCurrentBaseGeoFence, selectPosition],
  (currentfence, position) => {
    if (!position?.coordinates.length) return true;
    return !!currentfence;
  },
);

export const selectCurrentBaseGeoFenceWithPovs = createSelector(
  [selectCurrentBaseGeoFence, selectAllPovs],
  (fence, povs) => {
    if (!fence) return null;

    const povsInFence = (povs || []).filter(
      (pov) =>
        pov.fence === fence?.id && pov.geometry?.coordinates?.length === 2,
    );

    return { fence, povs: povsInFence };
  },
);

export const selectCurrentGeoFence = createSelector(
  [getGeoState, selectCurrentBaseGeoFenceWithPovs, getConfigState],
  (
    geoState,
    currentFence,
    { appConfig: { INVIEW_THRESHOLD_ANGLE, INVIEW_THRESHOLD_DISTANCE } },
  ): CurrentGeoFence | null => {
    if (!currentFence) return null;

    const { fence, povs } = currentFence;

    const enhancedPovs = getEnhancedPovs(
      geoState,
      povs,
      INVIEW_THRESHOLD_ANGLE,
      INVIEW_THRESHOLD_DISTANCE,
    );

    return {
      fence,
      povs: enhancedPovs,
    };
  },
);

export const selectClosestPov = createSelector(
  selectCurrentGeoFence,
  (fence) => (fence && getClosestPovInView(fence.povs)) || undefined,
);
