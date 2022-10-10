import { useMemo } from "react"
import { getPovsAssetsBaseUrl } from "@virtual-time-travel/app-config"
import { PovId } from "@virtual-time-travel/geo-types"
import { AvailLocales, getLocalizedField } from "@virtual-time-travel/localization"
import { StyledCard, StyledCardContent, StyledCardCover } from "../ui"
import { getAssetUrl } from "../utils"

export interface PovCardProps {
  pov: PovId
}




export function PovCard({ pov }: PovCardProps) {
  const { id, cover, title } = pov
  const label = useMemo(() => getLocalizedField(title, AvailLocales.de), [title])

  const coverSrc = useMemo(() => {
    return getAssetUrl(getPovsAssetsBaseUrl(), cover)
  }, [cover])

  return <StyledCard>
    <StyledCardCover>
      {!!coverSrc && <img src={coverSrc} alt={label} />}
    </StyledCardCover>

    <StyledCardContent>
      <h3>{label}</h3>
    </StyledCardContent>
  </StyledCard>
}