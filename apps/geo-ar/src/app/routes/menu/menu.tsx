/* eslint-disable react/jsx-no-useless-fragment */
import { useSelector } from "react-redux";
import {
  MainRoutes,
  useNestedRoute,
  useSubpageLink,
} from "@virtual-time-travel/app-router";
import {
  Markdown,
  MenuBackLink,
  MenuLink,
  Page,
  StyledMenuMain,
  StyledSubMenu,
} from "@virtual-time-travel/ui";
import { usePageBySlug } from "../../hooks/usePageBySlug";
import LanguagesMenu from "../../languages-menu/languages-menu";
import { selectCurrentLocaleSlug } from "../../store/locales.slice";
import { EnhancedPageEntry } from "../../store/pages.slice";
import { selectLocaleRoute } from "../../store/router";
import { RouteAnimation } from "../route-animation";

export function MenuRoute() {
  const homeRoute = useSelector(selectLocaleRoute);
  const { route, isSubroute } = useNestedRoute(homeRoute);
  const { basePathname, currentPage } = route;

  const { page, subpages } = usePageBySlug(currentPage || MainRoutes.Menu);

  if (!page) return <></>;

  const { identifier, title, contentUrl } = page;

  return (
    <RouteAnimation key={currentPage}>
      <Page withLogo={!isSubroute}>
        {isSubroute && (
          <MenuBackLink
            {...{ label: title || identifier, linkTo: basePathname }}
          />
        )}

        <Markdown contentUrl={contentUrl} />

        {isSubroute ? (
          <SubMenu {...{ subpages }} />
        ) : (
          <>
            <MainMenu {...{ subpages }} />
            <LanguagesMenu />
          </>
        )}
      </Page>
    </RouteAnimation>
  );
}

interface MenuProps {
  subpages?: Array<EnhancedPageEntry>;
}

function MainMenu({ subpages }: MenuProps) {
  if (!subpages || !subpages.length) return <></>;
  return (
    <StyledMenuMain>
      {subpages.map((sp) => (
        <MenuSubpageLink {...{ page: sp, main: true }} key={sp.id} />
      ))}
    </StyledMenuMain>
  );
}

function SubMenu({ subpages }: MenuProps) {
  if (!subpages || !subpages.length) return <></>;
  return (
    <StyledSubMenu>
      {subpages.map((sp) => (
        <MenuSubpageLink {...{ page: sp }} key={sp.id} />
      ))}
    </StyledSubMenu>
  );
}

interface MenuSubpageLinkProps {
  page: EnhancedPageEntry;
  main?: boolean;
}

function MenuSubpageLink({ page, main }: MenuSubpageLinkProps) {
  const locale = useSelector(selectCurrentLocaleSlug);
  const { title, identifier, slug } = page;
  const linkTo = useSubpageLink(locale, identifier, slug);
  return <MenuLink {...{ label: title, linkTo, main }} />;
}

export default MenuRoute;
