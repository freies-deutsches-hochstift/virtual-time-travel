import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getRoutePath, MainRoutes } from '../utils';

/**
 * used with navigate - hashRouter
 * In case of agnostic content
 * returns any deep nested root
 */

export const useSubpageLink = (slug: string) => {
  const location = useLocation();
  const { pathname } = location;

  const linkTo = useMemo(() => {
    const isMainRoute = (
      Object.keys(MainRoutes) as (keyof typeof MainRoutes)[]
    ).find((r) => MainRoutes[r] === slug) as keyof typeof MainRoutes;

    if (isMainRoute) return getRoutePath(MainRoutes[isMainRoute]);
    return [pathname, slug].join('/');
  }, [pathname, slug]);

  return linkTo;
};
