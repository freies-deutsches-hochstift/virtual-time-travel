
import styled from '@emotion/styled'
import tw from 'twin.macro'
import Camera from '../../camera/camera'

export function QrScreen() {
  return (
    <StyledQr>
      <Camera {...{ useQr: true }} />
    </StyledQr>

  )
}


const StyledQr = styled.div(tw`
  w-full h-full
`)

export default QrScreen
