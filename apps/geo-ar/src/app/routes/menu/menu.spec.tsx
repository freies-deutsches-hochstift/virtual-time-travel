import { render } from "@testing-library/react";
import MenuRoute from "./menu";

describe("MenuRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MenuRoute />);
    expect(baseElement).toBeTruthy();
  });
});
