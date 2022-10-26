import { render } from "@testing-library/react";
import QrRoute from "./qr";

describe("QrRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<QrRoute />);
    expect(baseElement).toBeTruthy();
  });
});
