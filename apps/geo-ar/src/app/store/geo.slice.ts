import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getArStatusFeed,
  getClosestPovInView,
  getCurrentFence,
  getEnhancedPovsByCurrentLocation,
  getEnhancedPovsWithBearing,
  refineLocation,
} from "@virtual-time-travel/geo";
import {
  CurrentGeoFence,
  CurrentGeoFenceByLocation,
  DeviceOrientationEventRes,
  GeoState,
  StatePosition,
} from "@virtual-time-travel/geo-types";
import { LocalizedFieldGroup } from "@virtual-time-travel/localization";
import { RootState } from "../../main";
import { getConfigState } from "./config.slice";
import { getFencesState } from "./fences.slice";
import { selectLabels } from "./locales.slice";
import { selectAllPovs } from "./povs.slice";

export const GEO_FEATURE_KEY = "geo";

export const initialGeoState: GeoState = {
  position: null,
  compassHeading: 0,
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
      if (state.position && payload)
        state.position = refineLocation(state.position, payload, 500);
      state.position = payload;
    },

    updateOrientation(
      state: GeoState,
      action: PayloadAction<DeviceOrientationEventRes>,
    ) {
      state.compassHeading = action.payload.compassHeading;
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

export const selectCompassHeading = createSelector(
  getGeoState,
  ({ compassHeading }) => compassHeading,
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

export const selectCurrentLocationGeoFence = createSelector(
  [selectPosition, selectCurrentBaseGeoFenceWithPovs, getConfigState],
  (
    position,
    currentFence,
    { appConfig: { INVIEW_THRESHOLD_ANGLE } },
  ): CurrentGeoFenceByLocation | null => {
    if (!currentFence) return null;

    const { fence, povs } = currentFence;

    const enhancedPovs = getEnhancedPovsByCurrentLocation(
      position,
      povs,
      INVIEW_THRESHOLD_ANGLE,
    );

    return {
      fence,
      povs: enhancedPovs,
    };
  },
);

export const selectCurrentGeoFenceWithBearing = createSelector(
  [selectCompassHeading, selectCurrentLocationGeoFence, getConfigState],
  (
    compassHeading,
    currentFence,
    { appConfig: { INVIEW_THRESHOLD_DISTANCE } },
  ): CurrentGeoFence | null => {
    if (!currentFence) return null;

    const { fence, povs } = currentFence;

    const enhancedPovs = getEnhancedPovsWithBearing(
      compassHeading,
      povs,
      INVIEW_THRESHOLD_DISTANCE,
    );

    return {
      fence,
      povs: enhancedPovs,
    };
  },
);

export const selectClosestPov = createSelector(
  selectCurrentGeoFenceWithBearing,
  (fence) => (fence && getClosestPovInView(fence.povs)) || undefined,
);

/**
 * closest pov attributes are strictly depending by the location and compassHeading
 * to avoid re-renderings we just want to return what is strictly needed
 * depending by the usecase
 **/

export const selectHasClosestPov = createSelector(
  selectClosestPov,
  (closestPov) => !!closestPov,
);

export const selectIsClosestPovInView = createSelector(
  selectClosestPov,
  (closestPov) => !!closestPov?.inView,
);

export const selectIsClosestPovInDirectView = createSelector(
  selectClosestPov,
  (closestPov) => !!closestPov?.inDirectView,
);

export const selectInDirectViewPovId = createSelector(
  selectClosestPov,
  (closestPov) => (closestPov?.inDirectView ? closestPov.id : undefined),
);

export const selectClosestPovInViewCompassBearing = createSelector(
  selectClosestPov,
  (closestPov) => (closestPov ? closestPov.bearingViewportOrientation : 0),
);

export const selectArCurrentFeed = createSelector(
  [
    selectCurrentGeoFenceWithBearing,
    selectIsClosestPovInView,
    selectIsClosestPovInDirectView,
    getConfigState,
    selectLabels,
  ],
  (
    currentFence,
    isClosestPovInView,
    isClosestPovInDirectView,
    { appConfig: { LOOK_AROUND_MIN_DISTANCE, GET_CLOSER_MIN_DISTANCE } },
    labels,
  ) => {
    if (!currentFence?.povs || !currentFence?.povs.length) return null;
    const feeds = (labels?.["geo-feeds"] ||
      {}) as unknown as LocalizedFieldGroup;

    return getArStatusFeed(
      feeds,
      LOOK_AROUND_MIN_DISTANCE,
      GET_CLOSER_MIN_DISTANCE,
      currentFence?.povs,
      isClosestPovInView,
      isClosestPovInDirectView,
    );
  },
);
