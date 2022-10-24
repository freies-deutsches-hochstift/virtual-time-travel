import { render } from "@testing-library/react";
import ArFence from "./fence";

describe("ArFence", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ArFence />);
    expect(baseElement).toBeTruthy();
  });
});
