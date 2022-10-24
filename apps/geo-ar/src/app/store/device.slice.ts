import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeviceFeatures,
  DevicePermission,
  initialDeviceResponse,
  PermissionStatus,
} from "@virtual-time-travel/util-device";
import { RootState } from "../../main";

export const DEVICE_FEATURE_KEY = "device";

type DeviceState = Array<DevicePermission>;

export const initialDevicesState: DeviceState = [
  { permission: DeviceFeatures.Camera, ...initialDeviceResponse },

  { permission: DeviceFeatures.Geolocation, ...initialDeviceResponse },
  { permission: DeviceFeatures.Orientation, ...initialDeviceResponse },
];

export const deviceSlice = createSlice({
  name: DEVICE_FEATURE_KEY,
  initialState: initialDevicesState,
  reducers: {
    handlePermissionEvent(
      state: DeviceState,
      action: PayloadAction<DevicePermission>,
    ) {
      const { permission, status, error } = action.payload;
      const permissionToUpdate = state.find((p) => p.permission === permission);
      if (!permissionToUpdate) {
        state.push(action.payload);
      } else {
        permissionToUpdate.status = status;
        permissionToUpdate.error = error;
      }
    },
  },
});

export const deviceReducer = deviceSlice.reducer;

export const deviceActions = deviceSlice.actions;

export const getDevicesState = (rootState: RootState): DeviceState =>
  rootState[DEVICE_FEATURE_KEY];

export const selectGeoPermissions = createSelector(getDevicesState, (state) => {
  const mandatoryFeatures = [
    DeviceFeatures.Geolocation,
    DeviceFeatures.Orientation,
  ];
  const mandatory = state.filter((p) =>
    mandatoryFeatures.find((f) => f === p.permission),
  );

  return mandatory.map((m) => m?.status);
});

export const selectHasArPermissions = createSelector(
  getDevicesState,
  (state) => {
    const mandatoryFeatures = [
      DeviceFeatures.Geolocation,
      DeviceFeatures.Orientation,
      DeviceFeatures.Camera,
    ];

    const mandatory = state.filter((p) =>
      mandatoryFeatures.find((f) => f === p.permission),
    );

    return (
      mandatory.filter((m) =>
        [PermissionStatus.Denied, PermissionStatus.Unavailable].find(
          (s) => s === m?.status,
        ),
      ).length === 0
    );
  },
);

export const selectCameraPermission = createSelector(
  getDevicesState,
  (state) =>
    state.find((p) => p.permission === DeviceFeatures.Camera)?.status ||
    PermissionStatus.Unknown,
);

export const selectHasCameraPermission = createSelector(
  selectCameraPermission,
  (status) => status === PermissionStatus.Granted,
);
