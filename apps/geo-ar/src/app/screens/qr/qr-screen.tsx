
import styled from '@emotion/styled'
import tw from 'twin.macro'
import ArCamera from '../../ar/camera'

export function QrScreen() {
  return (
    <StyledQr>
      <ArCamera {...{ useQr: true }} />
    </StyledQr>

  )
}


const StyledQr = styled.div(tw`
  w-full h-full
`)

export default QrScreen
