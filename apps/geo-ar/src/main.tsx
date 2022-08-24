import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { GENERAL_FEATURE_KEY, generalReducer } from './app/state/general.slice';
import { GEO_FEATURE_KEY, geoReducer } from './app/state/geo.slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
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
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
