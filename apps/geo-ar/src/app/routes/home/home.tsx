import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MainRoutes } from "@virtual-time-travel/app-router";
import { MainLabels } from "@virtual-time-travel/localization";
import { ActionsGroup, Button, Page } from "@virtual-time-travel/ui";
import { useLabel } from "../../hooks/use-label";
import PageContent from "../../page-content/page-content";
import { selectAllRoutes } from "../../store/router";

export function HomeRoute() {
  const routes = useSelector(selectAllRoutes);
  const startLabel = useLabel(MainLabels.Start);

  const redirectLink = useMemo(() => {
    return routes.find((r) => r.routeKey === MainRoutes.Intro)?.path || "";
  }, [routes]);

  return (
    <Link to={redirectLink}>
      <Page withLogo>
        <div className="flex flex-col min-h-full">
          <PageContent {...{ identifier: MainRoutes.Home }} />
          <div className="flex-1 flex items-center">
            <ActionsGroup left>
              <Button inverted>{startLabel}</Button>
            </ActionsGroup>
          </div>
        </div>
      </Page>
    </Link>
  );
}

export default HomeRoute;
