import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * used with navigate - hashRouter.
 * In case of agnostic content
 * returns route and navigation params from pathname
 */

export const useNestedRoute = (homeRoute?: string) => {
  const location = useLocation();
  const { pathname } = location;

  const route = useMemo(() => {
    const paths = pathname.split("/");
    const currentPage = paths.pop();
    return { basePathname: paths.join("/"), currentPage };
  }, [pathname]);

  const isSubroute = useMemo(
    () => !!route.basePathname && route.basePathname !== homeRoute,
    [route, homeRoute],
  );

  console.log(route, isSubroute, homeRoute);

  return { route, isSubroute };
};
