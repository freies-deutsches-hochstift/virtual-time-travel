import { useMemo } from 'react'
import styled from '@emotion/styled'
import { Markdown, StyledMarkdown, StyledMarkdownWrapper } from '@virtual-time-travel/markdown'
import tw from 'twin.macro'
import { ActionsGroup } from '../actions-group/actions-group'
import Button from '../button/button'
import Icon, { Icons } from '../icon'

export interface DialogProps {
  contentUrl: string
  labels?: { [key: string]: string }
  onConfirm?: (event: unknown) => unknown
  onCancel?: (event: unknown) => unknown
  onClose?: (event: unknown) => unknown
  disabledAfterClick?: true,
}

export function Dialog({
  contentUrl,
  onCancel,
  onConfirm,
  onClose,
  labels = {},
}: DialogProps) {
  const { confirm, cancel } = labels

  const withConfirm = useMemo(
    () => typeof onConfirm === 'function',
    [onConfirm]
  )
  const withCancel = useMemo(() => typeof onCancel === 'function', [onCancel])
  const withClose = useMemo(() => typeof onClose === 'function', [onClose])

  const withActions = useMemo(
    () => withConfirm || withCancel,
    [withConfirm, withCancel]
  )

  return (
    <StyledDialog>
      <StyledDialogInner>
        {withClose && (
          <StyledCloseBtn onClick={onClose}>
            <Icon type={Icons.Close} />
          </StyledCloseBtn>
        )}

        <StyledDialogContent>
          <Markdown
            {...{
              contentUrl,
              labels,
              actions: withActions && (
                <ActionsGroup>
                  {!!onCancel && (
                    <Button secondary onClick={onCancel}>
                      {cancel}
                    </Button>
                  )}
                  {!!onConfirm && (
                    <Button disabledAfterClick onClick={onConfirm}>{confirm}</Button>
                  )}
                </ActionsGroup>
              ),
            }}
          />
        </StyledDialogContent>

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
    flex flex-col text-center
    rounded-ui-dialog
    relative
    landscape:h-full
  `,
  `
    filter: var(--ui-dialog-filter);

    ${StyledMarkdownWrapper} {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    ${StyledMarkdown}  {
      padding: 1rem;
    }

    ${StyledMarkdown} img,
    img {
      max-height: 25vh;
      padding: 2rem auto;
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

const StyledCloseBtn = styled.div(tw`
  w-4 h-4
  absolute z-max
  top-2 right-2
`)

const StyledDialogContent = styled.div(tw`
  flex-1
`)

export default Dialog
