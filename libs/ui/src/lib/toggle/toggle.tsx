import { useMemo } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

export interface ToggleProps {
  onToggle: (e: unknown) => void;
  toggled: boolean;
  toggledLabel?: string;
  toggleLabel?: string;
}

export function Toggle({
  onToggle,
  toggled,
  toggledLabel,
  toggleLabel,
}: ToggleProps) {
  const hasLabel = useMemo(
    () => !!toggledLabel || !!toggleLabel,
    [toggledLabel, toggleLabel],
  );

  return (
    <StyledToggle onClick={onToggle}>
      <StyledToggleHandle {...{ toggled }} />
      {hasLabel && (
        <StyledToggleLabel {...{ toggled }}>
          {toggled ? toggledLabel : toggleLabel}
        </StyledToggleLabel>
      )}
    </StyledToggle>
  );
}

export const StyledToggle = styled.div(() => [
  tw`
      min-w-ui-toggle h-ui-toggle rounded-full bg-primary-a 
    `,
]);

type StyledToggleHandleProps = {
  toggled: boolean;
};

const StyledToggleHandle = styled.div(
  ({ toggled }: StyledToggleHandleProps) => [
    tw`
    absolute top-0 transition-all duration-500
    h-ui-toggle w-ui-toggle rounded-full bg-primary text-primary-a border-2
  `,
    toggled ? `left: calc(100% - var(--ui-toggle-size))` : tw`left-0`,
  ],
);

const StyledToggleLabel = styled.div(({ toggled }: StyledToggleHandleProps) => [
  tw`transition-all duration-500`,

  toggled
    ? `
    padding: 0 calc(var(--ui-toggle-size) *1.2) 0 calc(var(--ui-toggle-size) *.5);
  `
    : `
  padding: 0 calc(var(--ui-toggle-size) *.5) 0 calc(var(--ui-toggle-size) *1.2);
`,
]);

export default Toggle;
