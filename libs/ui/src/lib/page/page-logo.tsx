import Logo from "/assets/layout/app-logo.svg";
import tw from "twin.macro";

/**
 * app dependent logos can have different sizes/positions
 * styled in apps/geo-ar/assets/theme.css
 */

export const PageLogo = () => {
  return (
    <div className="page-logo" css={tw`mb-8`}>
      <Logo />
    </div>
  );
};

export default PageLogo;
