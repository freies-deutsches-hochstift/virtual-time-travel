import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../main';
import { getFencesState } from './fences.slice';
import { getLocalesState } from './locales.slice';
import { getPagesState } from './pages.slice';
import { getPovsState } from './povs.slice';

export const GENERAL_FEATURE_KEY = 'general';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GeneralState {}

export const initialGeneralState: GeneralState = {};

export const generalSlice = createSlice({
  name: GENERAL_FEATURE_KEY,
  initialState: initialGeneralState,
  reducers: {},
});

export const generalReducer = generalSlice.reducer;

export const generalActions = generalSlice.actions;

export const getGeneralState = (rootState: RootState): GeneralState =>
  rootState[GENERAL_FEATURE_KEY];

/*
 * Before to display the app verify that all async thunk (fetch-api) data
 * is correctly loaded
 */

export const selectAppIsReady = createSelector(
  [getLocalesState, getPagesState, getFencesState, getPovsState],
  (locales, pages, fences, povs) => {
    const thunkData = [locales, pages, fences, povs];
    const notLoaded = thunkData.filter((d) => d.loadingStatus !== 'loaded');
    return notLoaded.length === 0;
  }
);
