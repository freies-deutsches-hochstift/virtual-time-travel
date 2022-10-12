import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import tw from "twin.macro"


export interface ButtonProps {
  label: string
  onClick: (event?: unknown) => unknown | undefined
  secondary?: boolean
  highlight?: boolean
  disabled?: boolean
}

type StyledButtonStyleProps = {
  secondary?: boolean
  disabled?: boolean
  highlight?: boolean
}


const StyledButton = styled.span((props: StyledButtonStyleProps) => [
  tw`
    py-2 px-4
    text-ui-button-primary
    bg-ui-button-primary-bg
    rounded-ui-button
    text-center
  `,
  `filter: var(--ui-button-filter);`,
  props.secondary && tw`text-ui-button-secondary bg-ui-button-secondary-bg`,
  props.highlight && tw`text-ui-button-highlight bg-ui-button-highlight-bg`,
  props.disabled && tw`text-ui-button-disabled bg-ui-button-disabled-bg pointer-events-none`
])


export function Button(props: ButtonProps) {
  const { label, onClick, secondary, disabled, highlight } = props
  const [triggered, setTriggered] = useState(false)

  const handleClick = useCallback(() => {
    onClick()
    setTriggered(true)
  }, [onClick])

  return (
    <StyledButton onClick={handleClick} secondary={secondary} highlight={highlight} disabled={disabled || triggered}>
      {label}
    </StyledButton>
  )
}

export default Button
