import { useMemo } from "react"
import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import ArIcon from "./icons/explore"
import ListIcon from "./icons/list"
import MenuIcon from "./icons/menu"
import QrIcon from "./icons/qr"


interface IconTypes {
  [key: string]: () => EmotionJSX.Element
}

export interface IconProps {
  type: string
}


const iconTypes: IconTypes = {
  explore: ArIcon,
  list: ListIcon,
  menu: MenuIcon,
  qr: QrIcon
}

export function Icon(props: IconProps) {
  const { type } = props
  const IconType = useMemo(() => iconTypes[type], [type])

  return (
    <IconType />
  )
}

export default Icon
