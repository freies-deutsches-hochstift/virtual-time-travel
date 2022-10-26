// TODO
// import { StrictMode } from 'react';
// Effects firing twice in <React.StrictMode /> was added in React 18.
import * as ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./registerServiceWorker.js";
import App from "./app/app";
import { CONFIG_FEATURE_KEY, configReducer } from "./app/store/config.slice";
import { DEVICE_FEATURE_KEY, deviceReducer } from "./app/store/device.slice";
import { FENCES_FEATURE_KEY, fencesReducer } from "./app/store/fences.slice";
import { GENERAL_FEATURE_KEY, generalReducer } from "./app/store/general.slice";
import { GEO_FEATURE_KEY, geoReducer } from "./app/store/geo.slice";
import { LOCALES_FEATURE_KEY, localesReducer } from "./app/store/locales.slice";
import { PAGES_FEATURE_KEY, pagesReducer } from "./app/store/pages.slice";
import { POVS_FEATURE_KEY, povsReducer } from "./app/store/povs.slice";
import WithAppConfig from "./app/with-app-config";
import "./styles/global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const store = configureStore({
  reducer: {
    [CONFIG_FEATURE_KEY]: configReducer,
    [LOCALES_FEATURE_KEY]: localesReducer,
    [PAGES_FEATURE_KEY]: pagesReducer,
    [FENCES_FEATURE_KEY]: fencesReducer,
    [POVS_FEATURE_KEY]: povsReducer,
    [DEVICE_FEATURE_KEY]: deviceReducer,
    [GEO_FEATURE_KEY]: geoReducer,
    [GENERAL_FEATURE_KEY]: generalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env["NODE_ENV"] !== "production",
  enhancers: [],
});

/**
 * Define redux types
 * https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
 */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

root.render(
  <Provider store={store}>
    <WithAppConfig>
      <App />
    </WithAppConfig>
  </Provider>,
);
