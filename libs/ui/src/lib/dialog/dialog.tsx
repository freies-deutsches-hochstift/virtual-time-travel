import { useMemo } from 'react'
import styled from '@emotion/styled'
import { getDialogsContentBaseUrl } from '@virtual-time-travel/app-config'
import { Markdown } from '@virtual-time-travel/markdown'
import tw from "twin.macro"
import { ActionsGroup } from '../actions-group/actions-group'
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
    flex flex-col text-center
    rounded-ui-dialog
  `,
  `
    height: 70vh;
    filter: var(--ui-dialog-filter);

    & img {
      max-height: 35vh;
      margin: auto;
      object-fit: contain;
    }

    & h1, & h2 {
      font-size: 2rem;
      line-height: 1.25em;
      margin: 0 0 1rem 0;
    }

    & h3 {
      font-size: 1.5rem;
      line-height: 1.6em;
      margin: 0 0 1rem 0;
    }
  `
])

const StyledDialogContent = styled.div(tw`
  flex-1
`)


export function Dialog(props: DialogProps) {

  const { contentId, locale, onCancel, onConfirm } = props

  const withConfirm = useMemo(() => typeof onConfirm === 'function', [onConfirm])
  const withCancel = useMemo(() => typeof onCancel === 'function', [onCancel])

  return (
    <StyledDialog>
      <StyledDialogInner>
        {withCancel && <div onClick={onCancel}>x</div>}
        <StyledDialogContent>
          <Markdown {...{ id: contentId, baseUrl: getDialogsContentBaseUrl(locale) }} />
        </StyledDialogContent>
        {withConfirm && (<ActionsGroup>
          {!!onConfirm && <Button label="confirm" onClick={onConfirm} />}
        </ActionsGroup>)}

      </StyledDialogInner>
    </StyledDialog>
  )
}

export default Dialog
