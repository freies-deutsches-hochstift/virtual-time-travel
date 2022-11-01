import { useMemo } from "react";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import tw from "twin.macro";
import { ActionsGroup } from "../actions-group/actions-group";
import Button from "../button/button";
import FadeAnimation from "../fade-animation/fade-animation";
import Icon, { Icons } from "../icon";
import {
  Markdown,
  StyledMarkdownContent,
  StyledMarkdownWrapper,
} from "../markdown";

export interface DialogProps {
  contentUrl: string;
  show?: boolean;
  labels?: { [key: string]: string };
  onConfirm?: (event: unknown) => unknown;
  onCancel?: (event: unknown) => unknown;
  onClose?: (event: unknown) => unknown;
  skippable?: boolean;
  disabledAfterClick?: true;
}

export function Dialog({
  contentUrl,
  show,
  onCancel,
  onConfirm,
  onClose,
  skippable,
  labels = {},
}: DialogProps) {
  const { confirm, cancel, skip } = labels;

  const withConfirm = useMemo(
    () => typeof onConfirm === "function",
    [onConfirm],
  );
  const withCancel = useMemo(() => typeof onCancel === "function", [onCancel]);
  const withClose = useMemo(() => typeof onClose === "function", [onClose]);

  const withActions = useMemo(
    () => withConfirm || withCancel,
    [withConfirm, withCancel],
  );

  return (
    <AnimatePresence>
      {show && (
        <FadeAnimation
          css={tw`absolute inset-0 z-max
        flex items-center justify-center
        landscape:fixed`}
        >
          <StyledDialogBlanket />
          <StyledDialogInner>
            {withClose && (
              <StyledCloseBtn onClick={onClose}>
                {skippable ? (
                  skip
                ) : (
                  <Icon className="w-4 h-4" type={Icons.Close} />
                )}
              </StyledCloseBtn>
            )}

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
                      <Button disabledAfterClick onClick={onConfirm}>
                        {confirm}
                      </Button>
                    )}
                  </ActionsGroup>
                ),
              }}
            />
          </StyledDialogInner>
        </FadeAnimation>
      )}
    </AnimatePresence>
  );
}

const StyledDialogBlanket = styled.div([
  tw`absolute inset-0 bg-ui-dialog-overlay pointer-events-none
  `,
]);

const StyledDialogInner = styled.div([
  tw`
    text-ui-dialog-primary
    w-ui-dialog h-ui-dialog max-w-ui-dialog
    bg-ui-dialog-bg
    rounded-ui-dialog
    relative
    overflow-hidden
    text-center
    landscape:h-full
  `,
  `
    filter: var(--ui-dialog-filter);

    ${StyledMarkdownWrapper} {
      min-height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 0;
      flex:1;
      overflow: hidden;
    }

    ${StyledMarkdownContent}  {
      padding: 1rem;
    }

    ${StyledMarkdownContent} img,
    img {
      max-height: 25vh;
      padding: 2rem auto;
      object-fit: contain;
    }

    ${StyledMarkdownContent} h3 {
      font-size: 1.3rem;
      line-height: 1.6em;
      margin: 0 0 1rem 0;
    }

    ${StyledMarkdownContent} h1,
    ${StyledMarkdownContent} h2 {
      font-size: 2rem;
      line-height: 1.25em;
      margin: 0 0 1rem 0;
    }
  `,
]);

const StyledCloseBtn = styled.div(tw`
  absolute z-max
  top-2 right-2
`);

export default Dialog;
