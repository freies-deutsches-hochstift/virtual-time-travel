import { render } from "@testing-library/react";
import ArDeviceOrientationHelper from "./device-orientation-helper";

describe("ArDeviceOrientationHelper", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ArDeviceOrientationHelper />);
    expect(baseElement).toBeTruthy();
  });
});
