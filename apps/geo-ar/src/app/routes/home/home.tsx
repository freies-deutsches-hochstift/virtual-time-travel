import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MainRoutes } from '@virtual-time-travel/app-router';
import { ActionsGroup, Button, Markdown, Page } from '@virtual-time-travel/ui';
import { RootState } from '../../../main';
import { useLabels } from '../../store/locales.slice';
import { selectHomePageContent } from '../../store/pages.slice';
import { selectAllRoutes } from '../../store/router';
import { RouteAnimation } from '../route-animation';

export function HomeRoute() {
  const pageContent = useSelector(selectHomePageContent);
  const routes = useSelector(selectAllRoutes);
  const selectLabel = useMemo(useLabels, []);
  const startLabel = useSelector((state: RootState) =>
    selectLabel(state, 'start')
  );

  const redirectLink = useMemo(() => {
    return routes.find((r) => r.routeKey === MainRoutes.Intro)?.path || '';
  }, [routes]);

  return (
    <Link to={redirectLink}>
      <RouteAnimation>
        <Page withLogo>
          <div className="flex flex-col min-h-full">
            <Markdown {...{ contentUrl: pageContent }} />
            <div className="flex-1 flex items-center">
              <ActionsGroup left>
                <Button inverted>{startLabel}</Button>
              </ActionsGroup>
            </div>
          </div>
        </Page>
      </RouteAnimation>
    </Link>
  );
}

export default HomeRoute;
