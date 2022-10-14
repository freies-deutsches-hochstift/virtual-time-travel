import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import { StyledPage, StyledPageDivider } from '@virtual-time-travel/ui'
import { PovsList } from '../../povs-list/povs-list'
import { selectListPageContent } from '../../store/pages.slice'

export function ListScreen() {
  const listPageContent = useSelector(selectListPageContent)

  return (
    <StyledPage>
      <Markdown {...{ contentUrl: listPageContent }} />
      <StyledPageDivider>
        <PovsList />
      </StyledPageDivider>
    </StyledPage>
  )
}

export default ListScreen
