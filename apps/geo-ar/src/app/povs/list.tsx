import { useSelector } from "react-redux"
import { useOnSelectPov } from '@virtual-time-travel/app-router'
import { PovsCards } from "@virtual-time-travel/geo"
import { selectAllPovs } from "../store/povs.slice"

export function PovsList() {
  const povs = useSelector(selectAllPovs)
  const onSelectPov = useOnSelectPov()

  return <PovsCards {...{ povs, onSelectPov }} />
}