import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Devices,
  DevicePermission,
  DeviceResponsePermission,
  initialDeviceResponse,
} from '@virtual-time-travel/util-device';

import { RootState } from '../../main';

export const DEVICE_FEATURE_KEY = 'device';

export interface DevicesState {
  [Devices.Camera]: DeviceResponsePermission;
  [Devices.Geolocation]: DeviceResponsePermission;
  [Devices.Orientation]: DeviceResponsePermission;
}

export const initialDevicesState: DevicesState = {
  [Devices.Camera]: initialDeviceResponse,
  [Devices.Geolocation]: initialDeviceResponse,
  [Devices.Orientation]: initialDeviceResponse,
};

export const deviceSlice = createSlice({
  name: DEVICE_FEATURE_KEY,
  initialState: initialDevicesState,
  reducers: {
    handlePermissionEvent(
      state: DevicesState,
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

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllDevice);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getDevicesState = (rootState: RootState): DevicesState =>
  rootState[DEVICE_FEATURE_KEY];
