import Logo from '/assets/medias/app-logo.svg'

/**
 * app dependent logos can have different sizes/positions
 * styled in apps/geo-ar/assets/theme.css
 */

export const PageLogo = () => {
  return (
    <div className="page-logo">
      <Logo />
    </div>
  )
}

export default PageLogo
