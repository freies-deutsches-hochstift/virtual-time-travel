import { ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { DialogsContentsIds } from "@virtual-time-travel/app-config";
import { LocalizedRoute } from "@virtual-time-travel/app-router";
import { Dialog, Icons, MainNav, MainNavButton } from "@virtual-time-travel/ui";
import tw from "twin.macro";
import useResizeObserver from "use-resize-observer";
import { useDialogByKey } from "../hooks/useDialogByKey";
import PovDetails from "../povs/details";
import { selectMainRoutes } from "../store/router";

export interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;
  const mainRoutes = useSelector(selectMainRoutes);
  const { ref, height, width } = useResizeObserver();
  const forcePortraitDialog = useDialogByKey(DialogsContentsIds.ForcePortrait);

  const forcePortrait = useMemo(
    () => (!!width && !!height ? width > height : false),
    [width, height],
  );

  return (
    <StyledLayout ref={ref}>
      <StyledMain>
        <>
          {children}
          <PovDetails />
          {forcePortrait && (
            <div className="pointer-events-none">
              <Dialog {...forcePortraitDialog} />
            </div>
          )}
        </>
      </StyledMain>

      <MainNav>
        <>
          {mainRoutes.map((route) => (
            <MainNavLink {...{ route }} key={route.path} />
          ))}
        </>
      </MainNav>
    </StyledLayout>
  );
}

interface MainNavLinkProps {
  route: LocalizedRoute;
}

function MainNavLink({ route }: MainNavLinkProps) {
  const { routeKey, path } = route;

  const iconType = useMemo(() => {
    const indexOfS = Object.values(Icons).indexOf(routeKey as unknown as Icons);

    const key = Object.keys(Icons)[indexOfS];

    return key ? Icons[key as keyof typeof Icons] : Icons.Menu;
  }, [routeKey]);

  return <MainNavButton type={iconType} link={path} />;
}

const StyledLayout = styled.div(tw`
    w-full h-full
    flex flex-col
`);

const StyledMain = styled.main(tw`
    w-full flex-1 overflow-hidden
    flex justify-center relative
`);

export default Layout;
