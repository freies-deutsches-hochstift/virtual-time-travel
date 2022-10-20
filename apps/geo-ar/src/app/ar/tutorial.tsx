/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback, useState } from 'react'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { Dialog } from '@virtual-time-travel/ui'
import { useDialogByKey } from '../hooks/useDialogByKey'

export function ArTutorial() {
  const [showTutorial, setShowTutorial] = useState<boolean>(true)
  const arTutorialDialog = useDialogByKey(DialogsContentsIds.ArTutorial)

  const onClose = useCallback(() => {
    setShowTutorial(false)
  }, [])

  return (
    <>
      {showTutorial && (
        <Dialog {...arTutorialDialog} onClose={onClose} onConfirm={onClose} />
      )}
    </>
  )
}

export default ArTutorial
