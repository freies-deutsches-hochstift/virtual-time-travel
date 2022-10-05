
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"


export function ListScreen() {
  return (
    <Page>
      <Markdown {...{ id: 'list', baseUrl: '/assets/items/pages/locales/de' }} />
      <p>TODO LIST</p>
    </Page>

  )
}

export default ListScreen
