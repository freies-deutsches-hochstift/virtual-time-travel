import styled from '@emotion/styled'
import tw from "twin.macro"


export interface ButtonProps {
  label: string
  onClick: (event?: unknown) => unknown | undefined
  secondary?: boolean
  disabled?: boolean
}

type StyledButtonStyleProps = {
  secondary?: boolean
  disabled?: boolean
}



const StyledButton = styled.span((props: StyledButtonStyleProps) => [
  tw`
    py-2 px-4
    text-ui-button-primary
    bg-ui-button-primary-bg
    rounded-ui-button
  `,
  `filter: var(--ui-button-filter);`,
  props.secondary && tw`text-ui-button-secondary bg-ui-button-secondary-bg`,
  props.disabled && tw`text-ui-button-disabled bg-ui-button-disabled-bg pointer-events-none`
])


export function Button(props: ButtonProps) {
  const { label, onClick, secondary, disabled } = props

  return (
    <StyledButton onClick={onClick} secondary={secondary} disabled={disabled}>
      {label}
    </StyledButton>
  )
}

export default Button
