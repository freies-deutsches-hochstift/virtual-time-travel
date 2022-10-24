import { render } from "@testing-library/react";
import { ArOverlay } from "./overlay";

describe("O", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ArOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
