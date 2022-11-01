import { PropsWithChildren, useCallback } from "react";
import { useSelector } from "react-redux";
import { useData } from "@virtual-time-travel/fetch-api";
import { Loading } from "@virtual-time-travel/loading";
import { useAppDispatch } from "../main";
import { fetchConfig, selectHasConfig } from "./store/config.slice";

export function WithAppConfig({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  const hasConfig = useSelector(selectHasConfig);

  const getConfig = useCallback(() => dispatch(fetchConfig()), [dispatch]);

  useData(getConfig);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{hasConfig ? children : <Loading />}</>;
}

export default WithAppConfig;
