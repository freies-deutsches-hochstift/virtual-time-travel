import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useData } from '@virtual-time-travel/fetch-api';
import { useAppDispatch } from '../../main';
import { selectConfig } from '../store/config.slice';
import { fetchFences } from '../store/fences.slice';
import { fetchLocales } from '../store/locales.slice';
import { fetchPages } from '../store/pages.slice';
import { fetchPovs } from '../store/povs.slice';

export const useStateData = () => {
  const dispatch = useAppDispatch();
  const config = useSelector(selectConfig);

  const getFences = useCallback(
    () => dispatch(fetchFences(config)),
    [dispatch, config]
  );
  useData(getFences);

  const getPovs = useCallback(
    () => dispatch(fetchPovs(config)),
    [dispatch, config]
  );
  useData(getPovs);

  const getPages = useCallback(
    () => dispatch(fetchPages(config)),
    [dispatch, config]
  );
  useData(getPages);

  const getLocales = useCallback(
    () => dispatch(fetchLocales(config)),
    [dispatch, config]
  );
  useData(getLocales);
};
