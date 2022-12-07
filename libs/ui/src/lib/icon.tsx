import { ComponentPropsWithoutRef, useMemo } from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface IconTypes {
  [key: string]: string;
}

export interface IconProps extends ComponentPropsWithoutRef<"div"> {
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
  ZoomIn = "zoomIn",
  ZoomOut = "zoomOut",
}

const iconTypes: IconTypes = {
  [Icons.Arrow]: "/assets/layout/icons/arrow.svg",
  [Icons.Close]: "/assets/layout/icons/close.svg",
  [Icons.Explore]: "/assets/layout/icons/explore.svg",
  [Icons.List]: "/assets/layout/icons/list.svg",
  [Icons.Menu]: "/assets/layout/icons/menu.svg",
  [Icons.Qr]: "/assets/layout/icons/qr.svg",
  [Icons.Info]: "/assets/layout/icons/info.svg",
  [Icons.ZoomIn]: "/assets/layout/icons/zoom-in.svg",
  [Icons.ZoomOut]: "/assets/layout/icons/zoom-out.svg",
};

export function Icon(props: IconProps) {
  const { type, ...rest } = props;
  const IconType = useMemo(() => iconTypes[type], [type]);

  return <StyledIcon maskUrl={IconType} {...rest} />;
}

export interface StyledIconrops {
  maskUrl: string;
}

export const StyledIcon = styled.div(({ maskUrl }: StyledIconrops) => [
  tw`
    w-full h-full
  `,

  `
    background: currentColor;
    -webkit-mask-image: url(${maskUrl});
    mask-image: url(${maskUrl});
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  `,
]);

export default Icon;
