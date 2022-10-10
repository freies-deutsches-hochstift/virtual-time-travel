import { useSelector } from "react-redux"
import { PovsCards } from "@virtual-time-travel/ui"
import { selectAllPovs } from "../store/povs.slice"


export function PovsList() {
  const povs = useSelector(selectAllPovs)

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!povs?.length) return <></>

  return <PovsCards {...{ povs }} />
}