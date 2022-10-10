import { ReactNode, useCallback } from 'react'
import { useSelector } from "react-redux"
import { useData } from '@virtual-time-travel/fetch-api'
import { useAppDispatch } from '../main'
import { fetchConfig, selectHasConfig } from "./store/config.slice"


interface WithAppConfigProps {
  children: ReactNode
}

export function WithAppConfig({ children }: WithAppConfigProps) {
  const dispatch = useAppDispatch()

  const hasConfig = useSelector(selectHasConfig)

  const getConfig = useCallback(
    () => dispatch(fetchConfig()),
    [dispatch]
  )

  useData(getConfig)


  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{hasConfig ? children : '...'}</>
}

export default WithAppConfig