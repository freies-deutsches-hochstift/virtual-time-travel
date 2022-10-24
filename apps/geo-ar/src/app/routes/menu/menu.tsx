/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  MainRoutes,
  useNestedRoute,
  useSubpageLink,
} from '@virtual-time-travel/app-router';
import {
  Markdown,
  MenuBackLink,
  MenuLink,
  Page,
  StyledMenuMain,
  StyledSubMenu,
} from '@virtual-time-travel/ui';
import { RootState } from '../../../main';
import LanguagesMenu from '../../languages-menu/languages-menu';
import {
  EnhancedPageEntry,
  usePageWithSubpages,
} from '../../store/pages.slice';
import { selectLocaleRoute } from '../../store/router';
import { RouteAnimation } from '../route-animation';
import {
  selectCurrentLocale,
  selectCurrentLocaleSlug,
} from '../../store/locales.slice';

export function MenuRoute() {
  const homeRoute = useSelector(selectLocaleRoute);
  const { route, isSubroute } = useNestedRoute(homeRoute);
  const { basePathname, currentPage } = route;
  const selectPageBySlug = useMemo(usePageWithSubpages, []);
  const entry = useSelector((state: RootState) =>
    selectPageBySlug(state, currentPage || MainRoutes.Menu)
  );

  const { page, subpages } = entry || {};

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
