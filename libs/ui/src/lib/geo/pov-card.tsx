import { PovId } from "@virtual-time-travel/geo-types"
import { AvailLocales, getLocalizedField } from "@virtual-time-travel/localization"
import { useMemo } from "react"
import { StyledCard, StyledCardContent, StyledCardCover } from "../ui"

export interface PovCardProps {
  pov: PovId
}


export function PovCard({ pov }: PovCardProps) {
  const { id, cover, title } = pov

  const label = useMemo(() => getLocalizedField(title, AvailLocales.de), [title])



  return <StyledCard>
    <StyledCardCover>
      {!!cover && <img src={cover as unknown as string} alt={id as unknown as string} />}
    </StyledCardCover>
    <StyledCardContent>
      <p>{label}</p>
    </StyledCardContent>
  </StyledCard>
}