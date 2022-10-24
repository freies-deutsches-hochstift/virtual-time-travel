import { render } from "@testing-library/react";
import ArTutorial from "./tutorial";

describe("ArTutorial", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ArTutorial />);
    expect(baseElement).toBeTruthy();
  });
});
