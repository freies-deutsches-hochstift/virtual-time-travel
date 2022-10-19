import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Loading } from '@virtual-time-travel/loading'
import { AnimatePresence } from 'framer-motion'
import { useStateData } from './hooks/useStateData'
import Layout from './layout/layout'
import ArScreen from './routes/ar/ar-screen'
import IntroScreen from './routes/intro/intro-screen'
import ListScreen from './routes/list/list-screen'
import MenuScreen from './routes/menu/menu-screen'
import PovScreen from './routes/pov/pov-screen'
import QrScreen from './routes/qr/qr-screen'
import SplashScreen from './routes/splash/splash-screen'
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

            <Route
              path={`${getRoutePath(MainRoutes.Pov)}/:id`}
              element={<PovScreen />}
            />

            <Route
              path={"*"}
              element={<p>Not found</p>}
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </HashRouter>
  )
}

export default App
