import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Markdown } from '@virtual-time-travel/markdown'
import { ActionsGroup, Button, Page } from '@virtual-time-travel/ui'
import { selectLabels } from '../../store/locales.slice'
import { selectSplashPageContent } from '../../store/pages.slice'
import { ScreenAnimation } from '../screen-animation'

export function SplashScreen() {
  const splashPageContent = useSelector(selectSplashPageContent)
  const { start } = useSelector(selectLabels)
  return (
    <Link to={getRoutePath(MainRoutes.Intro)}>
      <ScreenAnimation>
        <Page withLogo>
          <Markdown {...{ contentUrl: splashPageContent }} />
          <ActionsGroup left>
            <Button secondary>
              {start}
            </Button>
          </ActionsGroup>
        </Page>
      </ScreenAnimation>
    </Link>
  )
}

export default SplashScreen
