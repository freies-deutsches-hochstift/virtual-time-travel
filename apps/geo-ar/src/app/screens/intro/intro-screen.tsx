import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import {
  Page,
  StyledPageDivider,
  StyledPageGroup,
} from '@virtual-time-travel/ui'
import { PovsList } from '../../povs-list/povs-list'
import {
  selectIntroPageContent,
  selectListPageContent,
} from '../../store/pages.slice'
import { ScreenAnimation } from '../screen-animation'

export function IntroScreen() {
  const introPageContent = useSelector(selectIntroPageContent)
  const listPageContent = useSelector(selectListPageContent)

  return (
    <ScreenAnimation>
      <Page>
        <Markdown {...{ contentUrl: introPageContent }} />
        <StyledPageGroup>
          <Markdown {...{ contentUrl: listPageContent }} />
          <StyledPageDivider>
            <PovsList />
          </StyledPageDivider>
        </StyledPageGroup>
      </Page>
    </ScreenAnimation>
  )
}

export default IntroScreen
