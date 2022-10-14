import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import {
  StyledPage,
  StyledPageDivider,
  StyledPageGroup,
} from '@virtual-time-travel/ui'
import { PovsList } from '../../povs-list/povs-list'
import {
  selectIntroPageContent,
  selectListPageContent,
} from '../../store/pages.slice'

export function IntroScreen() {
  const introPageContent = useSelector(selectIntroPageContent)
  const listPageContent = useSelector(selectListPageContent)

  return (
    <StyledPage>
      <Markdown {...{ contentUrl: introPageContent }} />
      <StyledPageGroup>
        <Markdown {...{ contentUrl: listPageContent }} />
        <StyledPageDivider>
          <PovsList />
        </StyledPageDivider>
      </StyledPageGroup>
    </StyledPage>
  )
}

export default IntroScreen
