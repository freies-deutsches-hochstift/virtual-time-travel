import { render } from "@testing-library/react";
import ExploreRoute from "./explore";

describe("ArScreen", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ExploreRoute />);
    expect(baseElement).toBeTruthy();
  });
});
