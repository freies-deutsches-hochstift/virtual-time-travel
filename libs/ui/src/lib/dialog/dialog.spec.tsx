import { render } from "@testing-library/react";
import Dialog from "./dialog";

describe("Dialog", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Dialog
        {...{
          show: true,
          onConfirm: () => console.log("Dialog onConfirm"),
          onCancel: () => console.log("Dialog onCancel"),
          contentUrl: "/assets/items/dialogs/locales/de/request-camera.md",
          labels: {
            confirm: "ok",
            cancel: "cancel",
            skip: "skip",
            next: "go",
          },
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
