import styled from 'styled-components'

export interface ButtonProps {
  label: string,
  onClick: (event: unknown) => unknown
}

const StyledButton = styled.div`
  color: white;
  background: black;
  padding: .5rem;
`

export function Button(props: ButtonProps) {
  const { label, onClick } = props

  return (
    <StyledButton onClick={onClick}>
      {label}
    </StyledButton>
  )
}

export default Button
