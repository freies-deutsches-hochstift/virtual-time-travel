
import { Link } from "react-router-dom"
import { Markdown } from '@virtual-time-travel/markdown'
import Page from "../../page/page"




// const selectPageById = useMemo(usePageById, [
//   id
// ])

// const page = useSelector((state: RootState) => selectPageById(state, id))




export function SplashScreen() {
  return (
    <Link to="/intro">
      <Page>
        <Markdown {...{ id: 'splash', baseUrl: '/assets/items/pages/locales/de' }} />
      </Page>
    </Link>
  )
}

export default SplashScreen
