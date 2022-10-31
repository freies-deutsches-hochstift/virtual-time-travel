import { OnSelectPov } from "@virtual-time-travel/app-router";
import { EnhancedPov } from "@virtual-time-travel/geo-types";
import {
  StyledCard,
  StyledCardContent,
  StyledCardCover,
} from "@virtual-time-travel/ui";

export interface PovCardProps {
  pov: EnhancedPov;
  onSelectPov?: OnSelectPov;
}

export function PovCard({ pov, onSelectPov }: PovCardProps) {
  const { id, coverSrc, localizedTitle } = pov;

  const onSelectCard = () => {
    if (onSelectPov) onSelectPov(id);
  };

  return (
    <StyledCard onClick={onSelectCard}>
      <StyledCardCover>
        {!!coverSrc && <img src={coverSrc} alt={localizedTitle} />}
      </StyledCardCover>

      <StyledCardContent>
        <h3>{localizedTitle}</h3>
      </StyledCardContent>
    </StyledCard>
  );
}
