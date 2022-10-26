import { createSelector } from "@reduxjs/toolkit";
import {
  getRoutePath,
  LocalizedRoute,
  MainRoutes,
} from "@virtual-time-travel/app-router";
import {
  AvailLocales,
  LocaleId,
  LocalizedKey,
} from "@virtual-time-travel/localization";
import { getConfigState } from "./config.slice";
import { selectCurrentLocale } from "./locales.slice";
import {
  LocalizedPage,
  PageEntry,
  selectAllLocalizedPages,
} from "./pages.slice";

export const selectAllRoutes = createSelector(
  [selectAllLocalizedPages, selectCurrentLocale],
  (pages, locale) => {
    return [
      getRouteFromMainRoutes(MainRoutes.Home, pages, locale),
      getRouteFromMainRoutes(MainRoutes.Intro, pages, locale),
      getRouteFromMainRoutes(MainRoutes.Explore, pages, locale),
      getRouteFromMainRoutes(MainRoutes.Qr, pages, locale),
      getRouteFromMainRoutes(MainRoutes.List, pages, locale),
      getRouteFromMainRoutes(MainRoutes.Menu, pages, locale, "*"),
      getRouteFromMainRoutes(MainRoutes.Pov, pages, locale, ":id"),
    ] as Array<LocalizedRoute>;
  },
);

export const selectMainRoutes = createSelector(
  [selectAllLocalizedPages, getConfigState, selectCurrentLocale],
  (pages, { appConfig }, locale) => {
    const { DISABLE_QR, DISABLE_EXPLORE } = appConfig;

    return [
      !DISABLE_EXPLORE &&
        getRouteFromMainRoutes(MainRoutes.Explore, pages, locale),
      !DISABLE_QR && getRouteFromMainRoutes(MainRoutes.Qr, pages, locale),
      getRouteFromMainRoutes(MainRoutes.List, pages, locale),
      getRouteFromMainRoutes(MainRoutes.Menu, pages, locale),
    ].filter(Boolean) as Array<LocalizedRoute>;
  },
);

export const selectMenuRouteSwitchLocale = createSelector(
  [selectAllLocalizedPages, selectCurrentLocale],
  (pages, locale) => {
    return getRouteFromMainRoutes(MainRoutes.Menu, pages, locale);
  },
);

export const selectQrRoute = createSelector(
  [selectAllLocalizedPages, selectCurrentLocale],
  (pages, locale) =>
    getRouteFromMainRoutes(MainRoutes.Qr, pages, locale) as LocalizedRoute,
);

export const selectLocaleRoute = createSelector(
  [selectCurrentLocale],
  (locale) => {
    if (!locale) return;
    return getRoutePath(locale?.slug);
  },
);

export function getRouteFromMainRoutes(
  defaultRoute: MainRoutes,
  pages: Array<LocalizedPage> | Array<PageEntry> | undefined,
  locale: LocaleId | undefined,
  params?: string,
) {
  if (!locale) return defaultRoute;
  const { slug } = locale;
  const pageSlug = pages?.find((p) => p.identifier === defaultRoute)?.slug;

  const normalizedPageSlug =
    typeof pageSlug === "string" ? pageSlug : defaultRoute;

  return {
    routeKey: defaultRoute,
    path: getRoutePath(
      [slug, normalizedPageSlug, params].filter(Boolean).join("/"),
    ),
    route: [slug, normalizedPageSlug].filter(Boolean).join("/"),
  } as LocalizedRoute;
}

export function getMainRoutesForLocale(
  defaultRoute: MainRoutes,
  pages: Array<PageEntry> | undefined,
  locale: LocaleId | undefined,
) {
  if (!locale) return defaultRoute;
  const { slug } = locale;
  const pageSlug = pages?.find((p) => p.identifier === defaultRoute)
    ?.slug as LocalizedKey;

  const baseRoute = pageSlug[slug as AvailLocales];
  const normalizedPageSlug =
    typeof baseRoute === "string" ? baseRoute : defaultRoute;

  return {
    routeKey: defaultRoute,
    path: getRoutePath([slug, normalizedPageSlug].filter(Boolean).join("/")),
    route: [slug, normalizedPageSlug].filter(Boolean).join("/"),
  } as LocalizedRoute;
}
