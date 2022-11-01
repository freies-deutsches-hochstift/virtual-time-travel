import { ElementType, ReactNode, useMemo } from "react";

import ArrowIcon from "/assets/layout/icons/arrow.svg";
import CloseIcon from "/assets/layout/icons/close.svg";
import ArIcon from "/assets/layout/icons/explore.svg";
import InfoIcon from "/assets/layout/icons/info.svg";
import ListIcon from "/assets/layout/icons/list.svg";
import MenuIcon from "/assets/layout/icons/menu.svg";
import QrIcon from "/assets/layout/icons/qr.svg";

interface IconTypes {
  [key: string]: ReactNode;
}

export interface IconProps {
  type: string;
}

export enum Icons {
  Arrow = "arrow",
  Close = "close",
  Explore = "explore",
  List = "list",
  Menu = "menu",
  Qr = "qr",
  Info = "info",
}

const iconTypes: IconTypes = {
  [Icons.Arrow]: ArrowIcon,
  [Icons.Close]: CloseIcon,
  [Icons.Explore]: ArIcon,
  [Icons.List]: ListIcon,
  [Icons.Menu]: MenuIcon,
  [Icons.Qr]: QrIcon,
  [Icons.Info]: InfoIcon,
};

export function Icon(props: IconProps) {
  const { type } = props;
  const IconType = useMemo(() => iconTypes[type], [type]) as ElementType;

  return <IconType />;
}

export default Icon;
