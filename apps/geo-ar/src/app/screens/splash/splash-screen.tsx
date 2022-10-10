

import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"
import { selectSplashPageContent } from '../../store/pages.slice'

export function SplashScreen() {
  const splashPageContent = useSelector(selectSplashPageContent)
  return (
    <Link to="/intro">
      <Page>
        <Markdown {...{ contentUrl: splashPageContent }} />
      </Page>
    </Link>
  )
}

export default SplashScreen
