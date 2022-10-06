import { useMemo } from 'react'
import styled from '@emotion/styled'
import { getDialogsContentBaseUrl } from '@virtual-time-travel/app-config'
import { Markdown } from '@virtual-time-travel/markdown'
import tw from "twin.macro"
import Button from '../button/button'

export interface DialogProps {
  contentId: string,
  locale: string,
  onConfirm?: (event: unknown) => unknown,
  onCancel?: (event: unknown) => unknown
}

const StyledDialog = styled.div(tw`
  absolute inset-0 z-max
  bg-ui-dialog-overlay
  text-ui-dialog-primary
  flex items-center justify-center
`)

const StyledDialogInner = styled.div([
  tw`
    w-5/6 max-w-ui-dialog
    bg-ui-dialog-bg
    p-ui-dialog
    flex flex-col
  `,
  `
    filter: var(--ui-dialog-filter)
  `
])


const StyledDialogActions = styled.div(tw`
  flex 
`)

export function Dialog(props: DialogProps) {

  const { contentId, locale, onCancel, onConfirm } = props

  const withConfirm = useMemo(() => typeof onConfirm === 'function', [onConfirm])
  const withCancel = useMemo(() => typeof onCancel === 'function', [onCancel])

  return (
    <StyledDialog>
      <StyledDialogInner>
        {withCancel && <div onClick={onCancel}>x</div>}

        <Markdown {...{ id: contentId, baseUrl: getDialogsContentBaseUrl(locale) }} />

        {withConfirm && (<StyledDialogActions>
          {!!onConfirm && <Button label="confirm" onClick={onConfirm} />}
        </StyledDialogActions>)}

      </StyledDialogInner>
    </StyledDialog>
  )
}

export default Dialog
