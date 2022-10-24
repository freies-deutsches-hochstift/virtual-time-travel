import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import tw from "twin.macro";
import Camera from "../camera/camera";
import { selectHasCameraPermission } from "../store/device.slice";
import GeoWrapper from "./geo-wrapper/geo-wrapper";

export function Ar() {
  /*
   * camera and geo have separated custom request permission dialogs
   * and we want to display them one at the time
   */
  const hasCameraPermission = useSelector(selectHasCameraPermission);

  return (
    <StyledAr>
      {hasCameraPermission && <GeoWrapper />}
      <Camera />
    </StyledAr>
  );
}

const StyledAr = styled.div(tw`
  w-full h-full
`);

export default Ar;
