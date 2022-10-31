import { render } from "@testing-library/react";
import GeoWrapper from "./geo-wrapper";

describe("GeoWrapper", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GeoWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
