import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../main';

export const GENERAL_FEATURE_KEY = 'general';

/*
 * Update these interfaces according to your requirements.
 */
export interface GeneralEntity {
  id: number;
}

export interface GeneralState extends EntityState<GeneralEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const generalAdapter = createEntityAdapter<GeneralEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
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
 *   dispatch(fetchGeneral())
 * }, [dispatch]);
 * ```
 */
export const fetchGeneral = createAsyncThunk(
  'general/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getGenerals()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialGeneralState: GeneralState = generalAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: '',
  }
);

export const generalSlice = createSlice({
  name: GENERAL_FEATURE_KEY,
  initialState: initialGeneralState,
  reducers: {
    add: generalAdapter.addOne,
    remove: generalAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneral.pending, (state: GeneralState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchGeneral.fulfilled,
        (state: GeneralState, action: PayloadAction<GeneralEntity[]>) => {
          generalAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchGeneral.rejected, (state: GeneralState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message || '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const generalReducer = generalSlice.reducer;

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
 *   dispatch(generalActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const generalActions = generalSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllGeneral);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = generalAdapter.getSelectors();
export const getGeneralState = (rootState: RootState): GeneralState =>
  rootState[GENERAL_FEATURE_KEY];

export const selectAllGeneral = createSelector(getGeneralState, selectAll);

export const selectGeneralEntities = createSelector(
  getGeneralState,
  selectEntities
);
