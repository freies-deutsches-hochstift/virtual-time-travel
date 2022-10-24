import { render } from "@testing-library/react";
import PovRoute from "./pov";

describe("PovRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PovRoute />);
    expect(baseElement).toBeTruthy();
  });
});
