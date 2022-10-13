

import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"
import { selectSplashPageContent } from '../../store/pages.slice'

export function SplashScreen() {
  const splashPageContent = useSelector(selectSplashPageContent)
  return (
    <Link to={getRoutePath(MainRoutes.Intro)}>
      <Page>
        <Markdown {...{ contentUrl: splashPageContent }} />
      </Page>
    </Link>
  )
}

export default SplashScreen
