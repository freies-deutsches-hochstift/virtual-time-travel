// TODO
// import { StrictMode } from 'react';
// Effects firing twice in <React.StrictMode /> was added in React 18.

import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './app/app'
import { DEVICE_FEATURE_KEY, deviceReducer } from './app/state/device.slice'
import { FENCES_FEATURE_KEY, fencesReducer } from './app/state/fences.slice'
import { GENERAL_FEATURE_KEY, generalReducer } from './app/state/general.slice'
import { GEO_FEATURE_KEY, geoReducer } from './app/state/geo.slice'
import { LOCALES_FEATURE_KEY, localesReducer } from './app/state/locales.slice'
import { PAGES_FEATURE_KEY, pagesReducer } from './app/state/pages.slice'
import { POVS_FEATURE_KEY, povsReducer } from './app/state/povs.slice'
import './styles/global.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const store = configureStore({
  reducer: {
    [LOCALES_FEATURE_KEY]: localesReducer,
    [PAGES_FEATURE_KEY]: pagesReducer,
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
    <App />
  </Provider>
)
