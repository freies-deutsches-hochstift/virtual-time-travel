/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LocalizedRoute, MainRoutes } from "@virtual-time-travel/app-router";
import { AvailLocales } from "@virtual-time-travel/localization";
import { LanguageSwitch } from "@virtual-time-travel/ui";
import { selectLocaleState } from "../store/locales.slice";
import { selectPages } from "../store/pages.slice";
import { getMainRoutesForLocale } from "../store/router";

export function LanguagesMenu() {
  const pages = useSelector(selectPages);
  const localesState = useSelector(selectLocaleState);
  const navigate = useNavigate();
  const { current, locales } = localesState;

  const switchLocale = useCallback(
    (key: AvailLocales) => {
      if (current === key) return;
      if (current === key) return;
      const nextLocale = locales?.find((l) => l.slug === key);
      if (!nextLocale) return console.warn("Missing locale", key);
      const nextRoute = getMainRoutesForLocale(
        MainRoutes.Menu,
        pages,
        nextLocale,
      ) as LocalizedRoute;
      if (!nextRoute) return console.warn("Missing localized route", key);

      navigate(`/${nextRoute.route}`);
    },
    [navigate, pages, locales, current],
  );

  if (!locales?.length || locales.length === 1) return <></>;

  return (
    <div className="pb-8">
      <LanguageSwitch {...{ ...localesState, switchLocale }} />
    </div>
  );
}

export default LanguagesMenu;
