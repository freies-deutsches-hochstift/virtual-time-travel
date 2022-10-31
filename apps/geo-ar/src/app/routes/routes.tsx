/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { uid } from "react-uid";
import {
  getRoutePath,
  MainRoutes,
  RouteAnimation,
} from "@virtual-time-travel/app-router";
import { AnimatePresence } from "framer-motion";
import { localesActions, selectAvailLocales } from "../store/locales.slice";
import { selectAllRoutes } from "../store/router";
import NotFoundRoute from "./not-found/not-found";
import * as views from "./views";

export const AppRoutes = () => {
  const routes = useSelector(selectAllRoutes);
  return (
    <>
      <RedirectRouter />
      <AnimatePresence mode="wait">
        <Routes>
          {routes.map((route) => {
            const { routeKey, path } = route;
            const RouteComponent = views[routeKey as keyof typeof views]
              .default as unknown as React.ElementType;
            return (
              <Route
                key={uid(route)}
                {...{
                  path,
                  element: (
                    <RouteAnimation key={uid(route)}>
                      <RouteComponent />
                    </RouteAnimation>
                  ),
                }}
              />
            );
          })}
          <Route path={"*"} element={<NotFoundRoute />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function RedirectRouter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { defaultLocale, locales } = useSelector(selectAvailLocales);
  const routes = useSelector(selectAllRoutes);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * because we use hashRouter we can not fully relay on route params
     * so lang validation/redirect has to be done manually
     */

    const maybeLang = pathname.split("/").filter(Boolean).shift();

    if (maybeLang === MainRoutes.Pov) {
      /**
       * if qrCodes are not localized
       * redirect to relative localized route
       */

      const povRoute = routes.find((r) => r.routeKey === MainRoutes.Pov);
      const povId = pathname.split("/").pop();
      if (povRoute) navigate([povRoute.route, povId].join("/"));
      return;
    }

    if (!maybeLang) return navigate(getRoutePath(defaultLocale));

    const lang = locales?.find((l) => {
      const matchLang = new RegExp(`^${l}\\b`);
      return !!matchLang.test(maybeLang);
    });

    if (lang) {
      dispatch(localesActions.setCurrentLocale(lang));
      return;
    }

    navigate(getRoutePath(defaultLocale));
  }, [pathname, defaultLocale, locales, routes, navigate, dispatch]);
  return <></>;
}
