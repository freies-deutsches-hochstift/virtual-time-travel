import { ReactNode, useMemo } from 'react'
import styled from '@emotion/styled'
import { DialogsContentsIds } from '@virtual-time-travel/app-config'
import { getRoutePath, MainRoutes } from '@virtual-time-travel/app-router'
import { Dialog, Icons, MainNav, MainNavButton } from '@virtual-time-travel/ui'
import tw from 'twin.macro'
import useResizeObserver from 'use-resize-observer'
import { useDialogByKey } from '../hooks/useDialogByKey'
import PovDetails from '../povs/details'

export interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  const { children } = props
  const { ref, height, width } = useResizeObserver()
  const forcePortraitDialog = useDialogByKey(DialogsContentsIds.ForcePortrait)

  const forcePortrait = useMemo(
    () => (!!width && !!height ? width > height : false),
    [width, height]
  )

  return (
    <StyledLayout ref={ref}>
      <StyledMain>
        <>
          {children}
          <PovDetails />
          {forcePortrait && (
            <div className="pointer-events-none">
              {' '}
              <Dialog {...forcePortraitDialog} />
            </div>
          )}
        </>
      </StyledMain>

      <MainNav>
        <>
          <MainNavButton
            type={Icons.Explore}
            link={getRoutePath(MainRoutes.Explore)}
          />
          <MainNavButton type={Icons.Qr} link={getRoutePath(MainRoutes.Qr)} />
          <MainNavButton
            type={Icons.List}
            link={getRoutePath(MainRoutes.List)}
          />
          <MainNavButton
            type={Icons.Menu}
            link={getRoutePath(MainRoutes.Menu)}
          />
        </>
      </MainNav>
    </StyledLayout>
  )
}

const StyledLayout = styled.div(tw`
    w-full h-full
    flex flex-col
`)

const StyledMain = styled.main(tw`
    w-full flex-1 overflow-hidden
    flex justify-center relative
`)

export default Layout
