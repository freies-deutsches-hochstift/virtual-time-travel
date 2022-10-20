import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/ui'
import {
  Page,
  StyledPageDivider,
  StyledPageGroup,
} from '@virtual-time-travel/ui'
import { PovsList } from '../../povs/list'
import {
  selectIntroPageContent,
  selectListPageContent,
} from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function IntroScreen() {
  const introPageContent = useSelector(selectIntroPageContent)
  const listPageContent = useSelector(selectListPageContent)

  return (
    <RouteAnimation>
      <Page>
        <Markdown {...{ contentUrl: introPageContent }} />
        <StyledPageGroup>
          <Markdown {...{ contentUrl: listPageContent }} />
          <StyledPageDivider>
            <PovsList />
          </StyledPageDivider>
        </StyledPageGroup>
      </Page>
    </RouteAnimation>
  )
}

export default IntroScreen
