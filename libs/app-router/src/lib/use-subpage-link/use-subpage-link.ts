import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getLocalizedRoutePath, MainRoutes } from "../utils";

/**
 * used with navigate - hashRouter
 * In case of agnostic content
 * returns any deep nested root
 */

export const useSubpageLink = (
  locale: string,
  identifier: string,
  slug: string,
) => {
  const location = useLocation();
  const { pathname } = location;

  const linkTo = useMemo(() => {
    const isMainRoute = (
      Object.keys(MainRoutes) as (keyof typeof MainRoutes)[]
    ).find((r) => MainRoutes[r] === identifier) as keyof typeof MainRoutes;

    if (isMainRoute) return getLocalizedRoutePath(locale, slug);

    return [pathname, slug].join("/");
  }, [pathname, identifier, slug, locale]);

  return linkTo;
};
