import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import { Page, StyledPageDivider } from '@virtual-time-travel/ui'
import { PovsList } from '../../povs-list/povs-list'
import { selectListPageContent } from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function ListScreen() {
  const listPageContent = useSelector(selectListPageContent)

  return (
    <RouteAnimation>
      <Page>
        <Markdown {...{ contentUrl: listPageContent }} />
        <StyledPageDivider>
          <PovsList />
        </StyledPageDivider>
      </Page>
    </RouteAnimation>
  )
}

export default ListScreen
