import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import {
  Page,
  PovsMap,
  StyledPageDivider,
  SwitchView,
} from '@virtual-time-travel/ui'
import { PovsList } from '../../povs/list'
import { selectLabels } from '../../store/locales.slice'
import { selectListPageContent } from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function ListScreen() {
  const listPageContent = useSelector(selectListPageContent)
  const { switchMap, switchList } = useSelector(selectLabels)

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
  )
}

export default ListScreen
