import { MainRoutes } from "@virtual-time-travel/app-router";
import { MainLabels } from "@virtual-time-travel/localization";
import { ActionsGroup, Button, Page } from "@virtual-time-travel/ui";
import { useLabel } from "../../hooks/use-label";
import PageContent from "../../page-content/page-content";

export function NotFoundRoute() {
  const goHomeLabel = useLabel(MainLabels.GoHome);
  return (
    <Page>
      <div className="flex flex-col min-h-full">
        <PageContent {...{ identifier: MainRoutes.NotFound }} />
        <div className="flex-1 flex items-center">
          <ActionsGroup left>
            <Button inverted>{goHomeLabel}</Button>
          </ActionsGroup>
        </div>
      </div>
    </Page>
  );
}

export default NotFoundRoute;
