import styled from '@emotion/styled'
import tw from 'twin.macro'

type ActionsGroupProps = {
  left?: boolean
  center?: boolean
  right?: boolean
}

export const ActionsGroup = styled.div(
  ({ left, center = true, right }: ActionsGroupProps) => [
    tw`
  w-full py-4
  flex items-center  gap-2
`,
    center && tw`justify-center`,
    left && tw`justify-start`,
    right && tw`justify-end`,
  ]
)
