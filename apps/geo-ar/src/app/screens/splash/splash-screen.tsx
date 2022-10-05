

import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getPagesContentBaseUrl } from '@virtual-time-travel/app-config'
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"
import { selectCurrentLocale } from '../../state/locales.slice'

export function SplashScreen() {
  const locale = useSelector(selectCurrentLocale)
  return (
    <Link to="/intro">
      <Page>
        <Markdown {...{ id: 'splash', baseUrl: getPagesContentBaseUrl(locale) }} />
      </Page>
    </Link>
  )
}

export default SplashScreen
