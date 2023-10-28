import { describe, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";

describe("PayForFilter", () => {
  it("keeps payFor hour when clear filters button is clicked", async () => {
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("pay-for-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /hour/i }));
    await userEvent.click(await screen.findByTestId("clear-filters"));

    expect(await screen.findByTestId("pay-for-dropdown")).toHaveTextContent(
      /hour/i,
    );
  });
});
