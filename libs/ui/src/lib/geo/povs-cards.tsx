import { EnhancedPov } from "@virtual-time-travel/geo-types"
import { StyledCards } from "../ui"
import { PovCard } from "./pov-card"

export interface PovsCardsProps {
  povs: Array<EnhancedPov>
}

export function PovsCards({ povs }: PovsCardsProps) {

  return <StyledCards>
    {povs.map(pov => <PovCard key={pov.id} {...{ pov }} />)}
  </StyledCards>
}

export default PovsCards