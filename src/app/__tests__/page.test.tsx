import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import Body from "@/app/body";

describe("routing /", () => {
  it("rendering page", async () => {
    render(
      <Body>
        <Page />
      </Body>
    );
  });
});
