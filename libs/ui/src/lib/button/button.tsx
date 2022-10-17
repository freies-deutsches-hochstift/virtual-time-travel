import { ReactNode, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

type StyledButtonStyleProps = {
  rounded?: boolean
  secondary?: boolean
  disabled?: boolean
  highlight?: boolean
}

export interface ButtonProps extends StyledButtonStyleProps {
  children: ReactNode
  onClick?: (event?: unknown) => unknown | undefined
}

export function Button(props: ButtonProps) {
  const { children, onClick, secondary, disabled, highlight, rounded } = props
  const [triggered, setTriggered] = useState(false)

  const handleClick = useCallback(() => {
    if (onClick) onClick()
    setTriggered(true)
  }, [onClick])

  return (
    <StyledButton
      onClick={handleClick}
      {...{ rounded, secondary, highlight, disabled: disabled || triggered }}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.span(
  ({
    rounded = true,
    secondary,
    highlight,
    disabled,
  }: StyledButtonStyleProps) => [
      tw`
    py-2 px-4
    text-ui-button-primary
    bg-ui-button-primary-bg
    flex items-center justify-center gap-3
  `,
      `
    filter: var(--ui-button-filter);
    svg {
      height: 1.4em;
      width: auto;
    }
  `,
      rounded && tw`rounded-ui-button`,
      secondary && tw`text-ui-button-secondary bg-ui-button-secondary-bg`,
      highlight && tw`text-ui-button-highlight bg-ui-button-highlight-bg`,
      disabled &&
      tw`text-ui-button-disabled bg-ui-button-disabled-bg pointer-events-none`,
    ]
)

export default Button
