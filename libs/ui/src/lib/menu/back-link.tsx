import { NavLink } from "react-router-dom";
import tw from "twin.macro";
import Icon, { Icons } from "../icon";
import { MenuLinkProps, StyledMenuLink } from "./link";

export const MenuBackLink = ({ label, linkTo }: MenuLinkProps) => {
  return (
    <NavLink to={linkTo}>
      <StyledMenuLink main css={tw`pb-8`}>
        <div css={tw`self-start`}>
          <Icon type={Icons.Arrow} />
        </div>
        {label}
      </StyledMenuLink>
    </NavLink>
  );
};
