import mockCarByCategoryResponse from "../../../test/helpers/mockCarByCategoryResponse.tsx";
import carsFixture from "../../../test/fixtures/carsFixture.ts";
import renderRouteInAppContext from "../../../test/helpers/renderRouteInAppContext.tsx";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect } from "vitest";

describe("CategoryFilter", () => {
  it("displays only cars that correspond to the selected category when user selects category", async () => {
    mockCarByCategoryResponse("economy", [carsFixture[0]]);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    const carItems = await screen.findAllByTestId("car-item");

    expect(carItems.length).toBe(1);
    expect(screen.getByText("Ford Fusion Hybrid, 2020")).toBeInTheDocument();
  });

  it("displays all cars when user selects all categories", async () => {
    mockCarByCategoryResponse("economy", [carsFixture[0]]);
    renderRouteInAppContext("/cars");

    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /economy/i }));
    await userEvent.click(await screen.findByTestId("category-dropdown"));
    await userEvent.click(screen.getByRole("option", { name: /all/i }));
    const carItems = await screen.findAllByTestId("car-item");

    expect(carItems.length).toBe(2);
  });
});
