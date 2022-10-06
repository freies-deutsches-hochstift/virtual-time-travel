import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useData } from '@virtual-time-travel/fetch-api';
import { fetchFences } from '../store/fences.slice';
import { fetchLocales } from '../store/locales.slice';
import { fetchPages } from '../store/pages.slice';
import { fetchPovs } from '../store/povs.slice';

export const useStateData = () => {
  const dispatch = useDispatch<Dispatch>();

  const getPovs = useCallback(
    () => dispatch(fetchPovs() as unknown as AnyAction),
    [dispatch]
  );
  useData(getPovs);

  const getFences = useCallback(
    () => dispatch(fetchFences() as unknown as AnyAction),
    [dispatch]
  );
  useData(getFences);

  const getPages = useCallback(
    () => dispatch(fetchPages() as unknown as AnyAction),
    [dispatch]
  );
  useData(getPages);

  const getLocales = useCallback(
    () => dispatch(fetchLocales() as unknown as AnyAction),
    [dispatch]
  );
  useData(getLocales);
};
