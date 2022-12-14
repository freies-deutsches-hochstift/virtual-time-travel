import { ReactNode, useCallback, useState } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { StyledIcon } from "../icon";

type StyledButtonStyleProps = {
  rounded?: boolean;
  onlyIcon?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  inverted?: boolean;
  squared?: boolean;
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
    onlyIcon,
    inverted,
    squared,
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
        onlyIcon,
        secondary,
        highlight,
        disabled: disabled || triggered,
        inverted,
        squared,
      }}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.span(
  ({
    rounded = true,
    onlyIcon,
    secondary,
    highlight,
    disabled,
    inverted,
    squared,
  }: StyledButtonStyleProps) => [
    tw`
    py-2 px-4
    text-ui-button-primary
    bg-ui-button-primary-bg
    flex items-center justify-center gap-3
  `,
    `
    filter: var(--ui-button-filter);
    ${StyledIcon} {
      height: 1.4em;
      width: 1.4em;
    }
    transition: transform .3s;
    &:active {
      transform: scale(.5);
    }
  `,
    rounded && !onlyIcon && tw`rounded-ui-button`,
    onlyIcon && tw`rounded-full w-12 h-12 p-2`,
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
    squared && tw`rounded-sm  w-8 h-8 p-1`,
  ],
);

export default Button;
