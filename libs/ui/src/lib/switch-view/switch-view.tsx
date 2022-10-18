/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Toggle from '../toggle/toggle'

export interface SwitchViewProps {
  primaryView: ReactNode
  primaryLabel?: string
  secondaryView: ReactNode
  secondaryLabel?: string
}

enum SwitchViews {
  Primary = 'primary',
  Secondary = 'secondary',
}

export function SwitchView({ primaryView, secondaryView, primaryLabel, secondaryLabel }: SwitchViewProps) {
  const [switchView, setSwitchView] = useState<SwitchViews>(
    SwitchViews.Primary
  )

  const view = useMemo(
    () => (switchView === SwitchViews.Primary ? primaryView : secondaryView),
    [switchView, primaryView, secondaryView]
  )
  const onToggle = () => {
    setSwitchView((s) =>
      s === SwitchViews.Primary ? SwitchViews.Secondary : SwitchViews.Primary
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <SwitchAnimation key={switchView}>{view}</SwitchAnimation>

      </AnimatePresence>
      <div className='absolute z-top right-2 bottom-2'>
        <Toggle {...{
          onToggle,
          toggled: switchView !== SwitchViews.Secondary,
          toggledLabel: primaryLabel,
          toggleLabel: secondaryLabel
        }} />
      </div>
    </>
  )
}

export default SwitchView

interface SwitchAnimationProps {
  children: ReactNode
}

const SwitchAnimation = ({ children }: SwitchAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex justify-center relative"
    >
      {children}
    </motion.div>
  )
}
