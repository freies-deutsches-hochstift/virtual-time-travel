/* eslint-disable react/jsx-no-useless-fragment */
import { ActionsGroup } from "../actions-group/actions-group";
import Button from "../button/button";
import { MarkdownActions, MarkdownLabels } from "./markdown-contents";

export interface MarkdownInlineActionsProps {
  isLastSlide: boolean;
  onNext: () => void;
  actions: MarkdownActions;
  labels?: MarkdownLabels;
}

export function MarkdownInlineActions({
  isLastSlide,
  actions,
  onNext,
  labels,
}: MarkdownInlineActionsProps) {
  const { next } = labels || {};

  return (
    <>
      {isLastSlide ? (
        actions
      ) : (
        <ActionsGroup>
          <Button onClick={onNext}>{next}</Button>
        </ActionsGroup>
      )}
    </>
  );
}

export default MarkdownInlineActions;
