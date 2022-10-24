import { MainRoutes } from "@virtual-time-travel/app-router";
import { ActionsGroup, Button, Page } from "@virtual-time-travel/ui";
import PageContent from "../../page-content/page-content";

export function NotFoundRoute() {
  return (
    <Page>
      <div className="flex flex-col min-h-full">
        <PageContent {...{ identifier: MainRoutes.NotFound }} />
        <div className="flex-1 flex items-center">
          <ActionsGroup left>
            <Button inverted>{"Back to homepage"}</Button>
          </ActionsGroup>
        </div>
      </div>
    </Page>
  );
}

export default NotFoundRoute;
