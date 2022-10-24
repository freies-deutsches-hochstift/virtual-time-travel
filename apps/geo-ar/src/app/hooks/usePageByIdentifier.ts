import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../main';
import { usePageFromIdentifier } from '../store/pages.slice';

export function usePageByIdentifier(slug: string) {
  const selectPageByIdentifier = useMemo(usePageFromIdentifier, []);
  return useSelector((state: RootState) => selectPageByIdentifier(state, slug));
}
