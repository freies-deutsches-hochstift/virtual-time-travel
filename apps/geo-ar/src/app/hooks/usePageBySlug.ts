import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../main';
import { usePageWithSubpages } from '../store/pages.slice';

export function usePageBySlug(slug: string) {
  const selectPageBySlug = useMemo(usePageWithSubpages, []);
  const entry = useSelector((state: RootState) =>
    selectPageBySlug(state, slug)
  );
  return entry || { page: null, subpages: null };
}
