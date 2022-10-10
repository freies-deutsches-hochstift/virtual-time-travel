
import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import Page, { StyledPageGroup } from "../../page/page"
import { PovsList } from '../../povs-list/povs-list'
import { selectIntroPageContent, selectListPageContent } from '../../store/pages.slice'


export function IntroScreen() {
  const introPageContent = useSelector(selectIntroPageContent)
  const listPageContent = useSelector(selectListPageContent)

  return (
    <Page>
      <Markdown {...{ contentUrl: introPageContent }} />
      <StyledPageGroup>
        <Markdown {...{ contentUrl: listPageContent }} />
        <PovsList />
      </StyledPageGroup>
    </Page>
  )
}

export default IntroScreen
