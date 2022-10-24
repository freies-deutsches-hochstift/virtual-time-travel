import { OnSelectPov } from "@virtual-time-travel/app-router";
import { EnhancedPov } from "@virtual-time-travel/geo-types";
import { StyledCards } from "@virtual-time-travel/ui";
import { PovCard } from "./pov-card";

export interface PovsCardsProps {
  povs?: Array<EnhancedPov>;
  onSelectPov?: OnSelectPov;
}

export function PovsCards({ povs, onSelectPov }: PovsCardsProps) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!povs?.length) return <></>;

  return (
    <StyledCards>
      {povs.map((pov) => (
        <PovCard key={pov.id} {...{ pov, onSelectPov }} />
      ))}
    </StyledCards>
  );
}

export default PovsCards;
