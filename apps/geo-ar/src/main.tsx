// TODO
// import { StrictMode } from 'react'; 
// Effects firing twice in <React.StrictMode /> was added in React 18.

import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { SpatialExample } from '@virtual-time-travel/spatial';

import { GENERAL_FEATURE_KEY, generalReducer } from './app/state/general.slice';
import { GEO_FEATURE_KEY, geoReducer } from './app/state/geo.slice';
import { CameraExample } from '@virtual-time-travel/camera';
import { APIExample, DBExample } from '@virtual-time-travel/data';
import { QrRouterExample } from '@virtual-time-travel/qrrouter';
import { CsvToJSONExample } from '@virtual-time-travel/csvtojson';
import Examples from './app/examples/examples';

import { DEVICE_FEATURE_KEY, deviceReducer } from './app/state/device.slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    [DEVICE_FEATURE_KEY]: deviceReducer,
    [GEO_FEATURE_KEY]: geoReducer,
    [GENERAL_FEATURE_KEY]: generalReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});
export type RootState = ReturnType<typeof store.getState>;

root.render(
  <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path="/"  >
          <Route index element={<App />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/examples/spatial" element={<SpatialExample />} />
          <Route path="/examples/camera" element={<CameraExample />} />
          <Route path="/examples/api" element={<APIExample />} />
          <Route path="/examples/db" element={<DBExample />} />
          <Route path="/examples/cvstojson" element={<CsvToJSONExample />} />
          <Route path="/examples/qrrouter" element={<QrRouterExample />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);



/*  */
