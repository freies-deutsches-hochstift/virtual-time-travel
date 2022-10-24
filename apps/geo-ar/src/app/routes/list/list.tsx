import { MainRoutes } from "@virtual-time-travel/app-router";
import { PovsMap } from "@virtual-time-travel/geo";
import { MainLabels } from "@virtual-time-travel/localization";
import { Page, StyledPageDivider, SwitchView } from "@virtual-time-travel/ui";
import { useLabel } from "../../hooks/use-label";
import { usePageByIdentifier } from "../../hooks/use-page-by-identifier";
import PageContent from "../../page-content/page-content";
import { PovsList } from "../../povs/list";

export function ListRoute() {
  const switchMap = useLabel(MainLabels.SwitchMap);
  const switchList = useLabel(MainLabels.SwitchList);

  const listPage = usePageByIdentifier(MainRoutes.List);

  return (
    <SwitchView
      primaryLabel={switchList}
      primaryView={
        <Page>
          <PageContent {...{ identifier: MainRoutes.List }} />
          <StyledPageDivider>
            <PovsList />
          </StyledPageDivider>
        </Page>
      }
      secondaryLabel={switchMap}
      secondaryView={<PovsMap contentUrl={listPage?.contentUrl} />}
    />
  );
}

export default ListRoute;
