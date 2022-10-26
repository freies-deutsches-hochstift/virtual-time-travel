import { render } from "@testing-library/react";
import IntroRoute from "./intro";

describe("IntroRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<IntroRoute />);
    expect(baseElement).toBeTruthy();
  });
});
