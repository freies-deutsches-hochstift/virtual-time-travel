import { Link } from "react-router-dom";
import { MainRoutes } from "@virtual-time-travel/app-router";
import { MainLabels } from "@virtual-time-travel/localization";
import { ActionsGroup, Button, Page } from "@virtual-time-travel/ui";
import { useGotoRoute } from "../../hooks/use-goto-route";
import { useLabel } from "../../hooks/use-label";
import PageContent from "../../page-content/page-content";

export function HomeRoute() {
  const startLabel = useLabel(MainLabels.Start);

  const { link } = useGotoRoute(MainRoutes.Intro);

  return (
    <Link to={link}>
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
