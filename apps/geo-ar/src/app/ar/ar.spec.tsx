import { render } from "@testing-library/react";
import Ar from "./ar";

describe("Ar", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Ar />);
    expect(baseElement).toBeTruthy();
  });
});
