import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllRoutes } from "../store/router";

export function useGotoRoute(routeKey: string) {
  const navigate = useNavigate();

  const routes = useSelector(selectAllRoutes);
  const entry = useMemo(() => {
    return routes.find((r) => r.routeKey === routeKey);
  }, [routes, routeKey]);

  const goToRoute = useCallback(() => {
    if (!entry) return navigate("/");

    navigate(`/${entry.route}`);
  }, [entry, navigate]);

  return { entry, goToRoute, link: `/${entry?.route}` || "/" };
}
