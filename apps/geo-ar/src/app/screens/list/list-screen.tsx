
import { useSelector } from 'react-redux'
import { getPagesContentBaseUrl } from '@virtual-time-travel/app-config'
import { Markdown } from '@virtual-time-travel/markdown'
import { selectCurrentLocale } from '../../../store/locales.slice'
import Page from "../../page/page"

export function ListScreen() {
  const locale = useSelector(selectCurrentLocale)

  return (
    <Page>
      <Markdown {...{ id: 'list', baseUrl: getPagesContentBaseUrl(locale) }} />
      <p>TODO LIST</p>
    </Page>

  )
}

export default ListScreen
