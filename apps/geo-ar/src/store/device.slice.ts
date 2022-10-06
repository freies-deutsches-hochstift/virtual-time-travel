import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeviceFeatures,
  DevicePermission,
  DeviceResponsePermission,
  initialDeviceResponse,
  PermissionStatus,
} from '@virtual-time-travel/util-device';
import { RootState } from '../main';

export const DEVICE_FEATURE_KEY = 'device';

export interface DeviceState {
  [DeviceFeatures.Camera]: DeviceResponsePermission;
  [DeviceFeatures.Geolocation]: DeviceResponsePermission;
  [DeviceFeatures.Orientation]: DeviceResponsePermission;
}

export const initialDevicesState: DeviceState = {
  [DeviceFeatures.Camera]: initialDeviceResponse,
  [DeviceFeatures.Geolocation]: initialDeviceResponse,
  [DeviceFeatures.Orientation]: initialDeviceResponse,
};

export const deviceSlice = createSlice({
  name: DEVICE_FEATURE_KEY,
  initialState: initialDevicesState,
  reducers: {
    handlePermissionEvent(
      state: DeviceState,
      action: PayloadAction<DevicePermission>
    ) {
      const { permission, status, error } = action.payload;
      state[permission] = { status, error };
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const deviceReducer = deviceSlice.reducer;

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
 *   dispatch(deviceActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const deviceActions = deviceSlice.actions;

export const getDevicesState = (rootState: RootState): DeviceState =>
  rootState[DEVICE_FEATURE_KEY];

export const selectGeoPermissions = createSelector(getDevicesState, (state) => {
  const mandatory = [
    state[DeviceFeatures.Geolocation],
    state[DeviceFeatures.Orientation],
  ];

  return mandatory.map((m) => m.status);
});

export const selectHasArPermissions = createSelector(
  getDevicesState,
  (state) => {
    const mandatory = [
      state[DeviceFeatures.Geolocation],
      state[DeviceFeatures.Orientation],
      state[DeviceFeatures.Camera],
    ];

    return (
      mandatory.filter((m) =>
        [PermissionStatus.Denied, PermissionStatus.Unavailable].find(
          (s) => s === m.status
        )
      ).length === 0
    );
  }
);

export const selectCameraPermission = createSelector(
  getDevicesState,
  (state) => state[DeviceFeatures.Camera].status
);

export const selectHasCameraPermission = createSelector(
  selectCameraPermission,
  (status) => status === PermissionStatus.Granted
);
