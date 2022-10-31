import { useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Loading } from "@virtual-time-travel/loading";
import { useStateData } from "./hooks/use-state-data";
import Layout from "./layout/layout";
import { AppRoutes } from "./routes/routes";
import { selectAppIsReady } from "./store/general.slice";

export function App() {
  const appIsReady = useSelector(selectAppIsReady);

  useStateData();
  if (!appIsReady) return <Loading />;

  return (
    <HashRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  );
}

export default App;
