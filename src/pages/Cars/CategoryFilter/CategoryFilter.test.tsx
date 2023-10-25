import carsFixture from "../../../test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import mockCarsResponseWithParams from "../../../test/helpers/mockCarsResponseWithParams.tsx";

describe("CategoryFilter", () => {
  it("displays only cars that correspond with the selected category when user selects category", async () => {
    mockCarsResponseWithParams([{ category: "economy" }], [carsFixture[0]], []);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));

    await waitFor(() =>
      expect(screen.getAllByTestId("car-item").length).toBe(1),
    );
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays all cars when user selects all categories", async () => {
    mockCarsResponseWithParams(
      [{ category: "economy" }],
      [carsFixture[0]],
      carsFixture,
    );
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /all/i }));

    await waitFor(() =>
      expect(screen.getAllByTestId("car-item").length).toBe(2),
    );
  });
});
