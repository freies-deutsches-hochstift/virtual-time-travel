import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Markdown } from '@virtual-time-travel/markdown'
import { ActionsGroup, Button, Page } from '@virtual-time-travel/ui'
import { RootState } from '../../../main'
import { useLabels } from '../../store/locales.slice'
import { selectSplashPageContent } from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function SplashScreen() {
  const splashPageContent = useSelector(selectSplashPageContent)
  const selectLabel = useMemo(useLabels, [])
  const startLabel = useSelector((state: RootState) =>
    selectLabel(state, 'start')
  )


  return (
    <Link to={getRoutePath(MainRoutes.Intro)}>
      <RouteAnimation>
        <Page withLogo>
          <div className='flex flex-col min-h-full'>
            <Markdown {...{ contentUrl: splashPageContent }} />
            <div className='flex-1 flex items-center'>
              <ActionsGroup left>
                <Button inverted>
                  {startLabel}
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
