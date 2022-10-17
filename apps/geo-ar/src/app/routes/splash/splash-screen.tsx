import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Markdown } from '@virtual-time-travel/markdown'
import { ActionsGroup, Button, Page } from '@virtual-time-travel/ui'
import { selectLabels } from '../../store/locales.slice'
import { selectSplashPageContent } from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function SplashScreen() {
  const splashPageContent = useSelector(selectSplashPageContent)
  const { start } = useSelector(selectLabels)
  return (
    <Link to={getRoutePath(MainRoutes.Intro)}>
      <RouteAnimation>
        <Page withLogo>
          <div className='flex flex-col min-h-full'>
            <Markdown {...{ contentUrl: splashPageContent }} />
            <div className='flex-1 flex items-center'>
              <ActionsGroup left>
                <Button inverted>
                  {start}
                </Button>
              </ActionsGroup>
            </div>
          </div>
        </Page>
      </RouteAnimation>
    </Link>
  )
}

export default SplashScreen
