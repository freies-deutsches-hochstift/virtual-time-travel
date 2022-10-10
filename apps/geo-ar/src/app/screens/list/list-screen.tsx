
import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"
import { PovsList } from '../../povs-list/povs-list'
import { selectListPageContent } from '../../store/pages.slice'

export function ListScreen() {
  const listPageContent = useSelector(selectListPageContent)

  return (
    <Page>
      <Markdown {...{ contentUrl: listPageContent }} />
      <PovsList />
    </Page>

  )
}

export default ListScreen
