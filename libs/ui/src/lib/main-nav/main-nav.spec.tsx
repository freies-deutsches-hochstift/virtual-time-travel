import { render } from "@testing-library/react";
import MainNav from "./main-nav";

describe("MainNav", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MainNav>
        <p>MainNav children</p>
      </MainNav>,
    );
    expect(baseElement).toBeTruthy();
  });
});
