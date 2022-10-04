// TODO
// import { StrictMode } from 'react';
// Effects firing twice in <React.StrictMode /> was added in React 18.

import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { CameraExample } from '@virtual-time-travel/camera'
import { CsvToJSONExample } from '@virtual-time-travel/csvtojson'
import { APIExample, DBExample } from '@virtual-time-travel/data'
import { QrRouterExample } from '@virtual-time-travel/qrrouter'
import { SpatialExample } from '@virtual-time-travel/spatial'
import App from './app/app'
import Examples from './app/examples/examples'
import { DEVICE_FEATURE_KEY, deviceReducer } from './app/state/device.slice'
import { FENCES_FEATURE_KEY, fencesReducer } from './app/state/fences.slice'
import { GENERAL_FEATURE_KEY, generalReducer } from './app/state/general.slice'
import { GEO_FEATURE_KEY, geoReducer } from './app/state/geo.slice'
import { POVS_FEATURE_KEY, povsReducer } from './app/state/povs.slice'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const store = configureStore({
  reducer: {
    [FENCES_FEATURE_KEY]: fencesReducer,
    [POVS_FEATURE_KEY]: povsReducer,
    [DEVICE_FEATURE_KEY]: deviceReducer,
    [GEO_FEATURE_KEY]: geoReducer,
    [GENERAL_FEATURE_KEY]: generalReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
})
export type RootState = ReturnType<typeof store.getState>

root.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/examples-spatial" element={<SpatialExample />} />
        <Route path="/examples-camera" element={<CameraExample />} />
        <Route path="/examples-api" element={<APIExample />} />
        <Route path="/examples-db" element={<DBExample />} />
        <Route path="/examples-cvstojson" element={<CsvToJSONExample />} />
        <Route path="/examples-qrrouter" element={<QrRouterExample />} />
      </Routes>
    </HashRouter>
  </Provider>
);


