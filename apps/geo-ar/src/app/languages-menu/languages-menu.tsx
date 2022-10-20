/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AvailLocales } from '@virtual-time-travel/localization'
import { LanguageSwitch } from '@virtual-time-travel/ui'
import { localesActions, selectLocaleState } from '../store/locales.slice'

export function LanguagesMenu() {
  const localesState = useSelector(selectLocaleState)
  const { locales } = localesState
  const dispatch = useDispatch()

  const switchLocale = useCallback(
    (key: AvailLocales) => {
      dispatch(localesActions.setCurrentLocale(key))
    },
    [dispatch]
  )

  if (!locales?.length || locales.length === 1) return <></>

  return (
    <div className="pb-8">
      <LanguageSwitch {...{ ...localesState, switchLocale }} />
    </div>
  )
}

export default LanguagesMenu
