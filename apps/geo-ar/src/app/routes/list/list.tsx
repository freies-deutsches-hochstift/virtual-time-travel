import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MainRoutes } from '@virtual-time-travel/app-router';
import { PovsMap } from '@virtual-time-travel/geo';
import { Page, StyledPageDivider, SwitchView } from '@virtual-time-travel/ui';
import { RootState } from '../../../main';
import { usePageByIdentifier } from '../../hooks/usePageByIdentifier';
import PageContent from '../../page-content/page-content';
import { PovsList } from '../../povs/list';
import { useLabels } from '../../store/locales.slice';
import { RouteAnimation } from '../route-animation';

export function ListRoute() {
  const selectLabel = useMemo(useLabels, []);
  const switchMap = useSelector((state: RootState) =>
    selectLabel(state, 'switchMap')
  );
  const switchList = useSelector((state: RootState) =>
    selectLabel(state, 'switchList')
  );

  const listPage = usePageByIdentifier(MainRoutes.List);

  return (
    <RouteAnimation>
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
    </RouteAnimation>
  );
}

export default ListRoute;
