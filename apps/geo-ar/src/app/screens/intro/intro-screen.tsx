
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"




// const selectPageById = useMemo(usePageById, [
//   id
// ])

// const page = useSelector((state: RootState) => selectPageById(state, id))




export function IntroScreen() {
  return (
    <Page>
      <Markdown {...{ id: 'intro', baseUrl: '/assets/items/pages/locales/de' }} />

      <Markdown {...{ id: 'list', baseUrl: '/assets/items/pages/locales/de' }} />
    </Page>

  )
}

export default IntroScreen
