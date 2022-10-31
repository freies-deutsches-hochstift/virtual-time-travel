import { MainRoutes } from "@virtual-time-travel/app-router";
import {
  Page,
  StyledPageDivider,
  StyledPageGroup,
} from "@virtual-time-travel/ui";
import PageContent from "../../page-content/page-content";
import { PovsList } from "../../povs/list";

export function IntroRoute() {
  return (
    <Page>
      <PageContent {...{ identifier: MainRoutes.Intro }} />
      <StyledPageGroup>
        <PageContent {...{ identifier: MainRoutes.List }} />
        <StyledPageDivider>
          <PovsList />
        </StyledPageDivider>
      </StyledPageGroup>
    </Page>
  );
}

export default IntroRoute;
