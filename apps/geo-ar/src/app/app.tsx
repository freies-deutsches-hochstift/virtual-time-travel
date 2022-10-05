
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useStateData } from './hooks/useStateData'
import IntroScreen from './intro-screen/intro-screen'
import Layout from './layout/layout'
import SplashScreen from './splash-screen/splash-screen'
import { selectAppIsReady } from './state/general.slice'


export function App() {
  const appIsReady = useSelector(selectAppIsReady)
  useStateData()

  if (!appIsReady) return <>...</>

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/intro" element={<IntroScreen />} />
          {/* <Route path="/intro" element={<Page id="intro" />} />
          <Route path="/qr" element={<Page id="qr" />} />
          <Route path="/list" element={<Page id="list" />} />
          <Route path="/menu" element={<Page id="menu" />} /> */}
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
