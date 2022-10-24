import { useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Loading } from '@virtual-time-travel/loading';
import { AnimatePresence } from 'framer-motion';
import { useStateData } from './hooks/useStateData';
import Layout from './layout/layout';
import { AppRoutes } from './routes/routes';
import { selectAppIsReady } from './store/general.slice';

export function App() {
  const appIsReady = useSelector(selectAppIsReady);

  useStateData();
  if (!appIsReady) return <Loading />;

  return (
    <HashRouter>
      <Layout>
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </Layout>
    </HashRouter>
  );
}

export default App;
