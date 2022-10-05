import styled from '@emotion/styled'
import tw from "twin.macro"
import Button from '../button/button'

export interface DialogProps {
  title: string,
  content: string,
  onConfirm: (event: unknown) => unknown,
  onCancel: (event: unknown) => unknown
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
  flex gap-ui-dialog
`)

export function Dialog(props: DialogProps) {

  const { title, content, onCancel, onConfirm } = props

  return (
    <StyledDialog>
      <StyledDialogInner>
        <div onClick={onCancel}>x</div>

        <h3>{title}</h3>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        <StyledDialogActions>
          <Button label="cancel" onClick={onCancel} />
          <Button label="confirm" onClick={onConfirm} />
        </StyledDialogActions>

      </StyledDialogInner>
    </StyledDialog>
  )
}

export default Dialog
