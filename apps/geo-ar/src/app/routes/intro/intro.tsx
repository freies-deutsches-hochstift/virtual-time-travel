import { MainRoutes } from "@virtual-time-travel/app-router";
import {
  Page,
  StyledPageDivider,
  StyledPageGroup,
} from "@virtual-time-travel/ui";
import PageContent from "../../page-content/page-content";
import { PovsList } from "../../povs/list";
import { RouteAnimation } from "../route-animation";

export function IntroRoute() {
  return (
    <RouteAnimation>
      <Page>
        <PageContent {...{ identifier: MainRoutes.Intro }} />
        <StyledPageGroup>
          <PageContent {...{ identifier: MainRoutes.List }} />
          <StyledPageDivider>
            <PovsList />
          </StyledPageDivider>
        </StyledPageGroup>
      </Page>
    </RouteAnimation>
  );
}

export default IntroRoute;
