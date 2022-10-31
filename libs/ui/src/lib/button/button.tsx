import { ReactNode, useCallback, useState } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

type StyledButtonStyleProps = {
  rounded?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  inverted?: boolean;
  disabledAfterClick?: boolean;
};

export interface ButtonProps extends StyledButtonStyleProps {
  children?: ReactNode;
  onClick?: (event?: unknown) => unknown | undefined;
}

export function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    secondary,
    disabled,
    highlight,
    rounded,
    inverted,
    disabledAfterClick,
  } = props;
  const [triggered, setTriggered] = useState(false);

  const handleClick = useCallback(() => {
    if (onClick) onClick();
    if (disabledAfterClick) setTriggered(true);
  }, [onClick, disabledAfterClick]);

  return (
    <StyledButton
      onClick={handleClick}
      {...{
        rounded,
        secondary,
        highlight,
        disabled: disabled || triggered,
        inverted,
      }}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.span(
  ({
    rounded = true,
    secondary,
    highlight,
    disabled,
    inverted,
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
    inverted && tw`bg-ui-button-primary text-ui-button-primary-bg`,
    secondary && tw`text-ui-button-secondary bg-ui-button-secondary-bg`,
    secondary &&
      inverted &&
      tw`bg-ui-button-secondary text-ui-button-secondary-bg`,
    highlight && tw`text-ui-button-highlight bg-ui-button-highlight-bg`,
    highlight &&
      inverted &&
      tw`bg-ui-button-highlight text-ui-button-highlight-bg`,
    disabled &&
      tw`text-ui-button-disabled bg-ui-button-disabled-bg pointer-events-none`,
  ],
);

export default Button;
