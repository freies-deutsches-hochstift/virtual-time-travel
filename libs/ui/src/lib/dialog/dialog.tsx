import styled from 'styled-components'
import Button from '../button/button'

export interface DialogProps {
  title: string,
  content: string,
  onConfirm: (event: unknown) => unknown,
  onCancel: (event: unknown) => unknown
}


// TODO actual styling
const StyledDialog = styled.div`
  position: absolute;
  z-index: 999;
  inset: 0;
  background: rgba(0,0,0,.3);
  display: flex;
`

const StyledDialogInner = styled.div`
  width: 75%;
  max-width: 16rem;
  margin: auto;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;
`

const StyledDialogActions = styled.div`
  display: flex;
  gap: 1em;
`

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
