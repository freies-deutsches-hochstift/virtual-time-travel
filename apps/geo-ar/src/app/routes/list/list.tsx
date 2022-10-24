import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PovsMap } from '@virtual-time-travel/geo';
import {
  Markdown,
  Page,
  StyledPageDivider,
  SwitchView,
} from '@virtual-time-travel/ui';
import { RootState } from '../../../main';
import { PovsList } from '../../povs/list';
import { useLabels } from '../../store/locales.slice';
import { selectListPageContent } from '../../store/pages.slice';
import { RouteAnimation } from '../route-animation';

export function ListRoute() {
  const listPageContent = useSelector(selectListPageContent);
  const selectLabel = useMemo(useLabels, []);
  const switchMap = useSelector((state: RootState) =>
    selectLabel(state, 'switchMap')
  );

  const switchList = useSelector((state: RootState) =>
    selectLabel(state, 'switchList')
  );

  return (
    <RouteAnimation>
      <SwitchView
        primaryLabel={switchList}
        primaryView={
          <Page>
            <Markdown {...{ contentUrl: listPageContent }} />
            <StyledPageDivider>
              <PovsList />
            </StyledPageDivider>
          </Page>
        }
        secondaryLabel={switchMap}
        secondaryView={<PovsMap contentUrl={listPageContent} />}
      />
    </RouteAnimation>
  );
}

export default ListRoute;
