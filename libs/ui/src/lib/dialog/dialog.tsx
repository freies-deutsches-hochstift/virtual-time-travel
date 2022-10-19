import { useMemo } from 'react'
import styled from '@emotion/styled'
import { Markdown, StyledMarkdown } from '@virtual-time-travel/markdown'
import tw from 'twin.macro'
import { ActionsGroup } from '../actions-group/actions-group'
import Button from '../button/button'
import Scrollable from '../scrollable/scrollable'

export interface DialogProps {
  contentUrl: string
  labels?: { [key: string]: string }
  onConfirm?: (event: unknown) => unknown
  onCancel?: (event: unknown) => unknown
}

export function Dialog({ contentUrl, onCancel, onConfirm, labels = {} }: DialogProps) {
  // TODO switch multiple 'steps' dialog
  const { confirm, cancel } = labels

  const withConfirm = useMemo(
    () => typeof onConfirm === 'function',
    [onConfirm]
  )
  const withCancel = useMemo(() => typeof onCancel === 'function', [onCancel])

  return (
    <StyledDialog>
      <StyledDialogInner>
        {withCancel && <div onClick={onCancel}></div>}
        <Scrollable>
          <StyledDialogContent>
            <Markdown {...{ contentUrl }} />
          </StyledDialogContent>
          {withConfirm && (
            <ActionsGroup>
              {!!onCancel && <Button secondary onClick={onCancel}>{cancel}</Button>}
              {!!onConfirm && <Button onClick={onConfirm}>{confirm}</Button>}
            </ActionsGroup>
          )}
        </Scrollable>
      </StyledDialogInner>
    </StyledDialog>
  )
}

const StyledDialog = styled.div(tw`
  absolute inset-0 z-max
  bg-ui-dialog-overlay
  text-ui-dialog-primary
  flex items-center justify-center
  landscape:fixed
`)

const StyledDialogInner = styled.div([
  tw`
    w-5/6 h-5/6 max-w-ui-dialog
    bg-ui-dialog-bg
    p-ui-dialog
    flex flex-col text-center
    rounded-ui-dialog
    landscape:h-full
  `,
  `
    filter: var(--ui-dialog-filter);

    ${StyledMarkdown} img,
    img {
      max-height: 25vh;
      margin: 2rem auto;
      object-fit: contain;
    }

    ${StyledMarkdown} h3 {
      font-size: 1.3rem;
      line-height: 1.6em;
      margin: 0 0 1rem 0;
    }

    ${StyledMarkdown} h1,
    ${StyledMarkdown} h2 {
      font-size: 2rem;
      line-height: 1.25em;
      margin: 0 0 1rem 0;
    }
  `,
])

const StyledDialogContent = styled.div(tw`
  flex-1
`)

export default Dialog
