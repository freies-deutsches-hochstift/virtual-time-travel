import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Loading } from '@virtual-time-travel/loading'
import { AnimatePresence } from 'framer-motion'
import { useStateData } from './hooks/useStateData'
import Layout from './layout/layout'
import ArScreen from './screens/ar/ar-screen'
import IntroScreen from './screens/intro/intro-screen'
import ListScreen from './screens/list/list-screen'
import MenuScreen from './screens/menu/menu-screen'
import QrScreen from './screens/qr/qr-screen'
import SplashScreen from './screens/splash/splash-screen'
import { selectAppIsReady } from './store/general.slice'

export function App() {
  const appIsReady = useSelector(selectAppIsReady)
  useStateData()
  if (!appIsReady) return <Loading />

  return (
    <HashRouter>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path={getRoutePath(MainRoutes.Home)}
              element={<SplashScreen />}
            />
            <Route
              path={getRoutePath(MainRoutes.Intro)}
              element={<IntroScreen />}
            />
            <Route
              path={getRoutePath(MainRoutes.Explore)}
              element={<ArScreen />}
            />
            <Route path={getRoutePath(MainRoutes.Qr)} element={<QrScreen />} />
            <Route
              path={getRoutePath(MainRoutes.List)}
              element={<ListScreen />}
            />
            <Route
              path={`${getRoutePath(MainRoutes.Menu)}/*`}
              element={<MenuScreen />}
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </HashRouter>
  )
}

export default App
