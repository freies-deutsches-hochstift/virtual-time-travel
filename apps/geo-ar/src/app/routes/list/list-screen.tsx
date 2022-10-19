import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Markdown } from '@virtual-time-travel/markdown'
import {
  Page,
  PovsMap,
  StyledPageDivider,
  SwitchView,
} from '@virtual-time-travel/ui'
import { RootState } from '../../../main'
import { PovsList } from '../../povs/list'
import { useLabels } from '../../store/locales.slice'
import { selectListPageContent } from '../../store/pages.slice'
import { RouteAnimation } from '../route-animation'

export function ListScreen() {
  const listPageContent = useSelector(selectListPageContent)
  const selectLabel = useMemo(useLabels, [])
  const switchMap = useSelector((state: RootState) =>
    selectLabel(state, 'switchMap')
  )

  const switchList = useSelector((state: RootState) =>
    selectLabel(state, 'switchList')
  )

  return (
    <RouteAnimation>
      <SwitchView
        primaryLabel={switchList}
        primaryView={
          <Page>
            <Markdown {...{ contentUrl: listPageContent }} />
            <StyledPageDivider>
              <PovsList />
            </StyledPageDivider>
          </Page>
        }
        secondaryLabel={switchMap}
        secondaryView={<PovsMap contentUrl={listPageContent} />}
      />
    </RouteAnimation>
  )
}

export default ListScreen
