/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import tw from "twin.macro";
import FadeAnimation from "../fade-animation/fade-animation";
import Toggle from "../toggle/toggle";

export interface SwitchViewProps {
  primaryView: ReactNode;
  primaryLabel?: string;
  secondaryView: ReactNode;
  secondaryLabel?: string;
}

enum SwitchViews {
  Primary = "primary",
  Secondary = "secondary",
}

export function SwitchView({
  primaryView,
  secondaryView,
  primaryLabel,
  secondaryLabel,
}: SwitchViewProps) {
  const [switchView, setSwitchView] = useState<SwitchViews>(
    SwitchViews.Primary,
  );

  const view = useMemo(
    () => (switchView === SwitchViews.Primary ? primaryView : secondaryView),
    [switchView, primaryView, secondaryView],
  );
  const onToggle = () => {
    setSwitchView((s) =>
      s === SwitchViews.Primary ? SwitchViews.Secondary : SwitchViews.Primary,
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <FadeAnimation
          css={tw`w-full h-full flex justify-center relative`}
          key={switchView}
        >
          {view}
        </FadeAnimation>
      </AnimatePresence>
      <div className="absolute z-top right-2 bottom-2">
        <Toggle
          {...{
            onToggle,
            toggled: switchView !== SwitchViews.Secondary,
            toggledLabel: primaryLabel,
            toggleLabel: secondaryLabel,
          }}
        />
      </div>
    </>
  );
}

export default SwitchView;
